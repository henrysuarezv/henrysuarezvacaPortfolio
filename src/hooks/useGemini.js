import OpenAI from "openai";
import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import env from "react-dotenv";
import { v4 as uuidv4 } from "uuid";
import toml from "@iarna/toml";
// usar la variable expuesta por react-dotenv

const client = new OpenAI({ apiKey: env.OPENAI_API_KEY, dangerouslyAllowBrowser: true });
const currentDate = new Date();

const apiToken = env.GEMINI_TOKEN;
let data;
async function loadData() {
    const res = await fetch("/data.toml"); // <-- usar public/data.toml
    if (!res.ok) {
        throw new Error(`Failed to load /data.toml: ${res.status}`);
    }
    const text = await res.text();
    // detección rápida si el servidor devolvió HTML (página 404/index.html)
    if (text.trim().startsWith("<")) {
        throw new Error("Received HTML instead of TOML. Ensure data.toml is in the public folder and path is '/data.toml'");
    }
    return toml.parse(text);
}
data = await loadData();
console.log(data)
data.todayDate = currentDate.toISOString().split("T")[0];

const initialPrompt = `Based on this data ${JSON.stringify(data, null, 2)}. 
Answer this question: `;

const endPrompt = "Only answer the question if it's related to henry job experience or about his knowledges. If you can't answer, say 'I can't answer that; please try another question .'";

const useGemini = () => {
    const [search, setSearch] = useState([]);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    const genAI = new GoogleGenerativeAI(apiToken);

    const createHistoryElement = (role, text = "Please try again later.") => {
        setHistory((prevHistory) => [
            ...prevHistory,
            {
                role,
                text,
                key: uuidv4(),
            },
        ]);
    };

    const askAI = async () => {
        setLoading(true);
        createHistoryElement("USER", search);
        setSearch("");
        try {
            const prompt = `${initialPrompt}${search}${endPrompt}`;
            console.log(prompt)
            const responsePrev = await client.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content: "You are an assistant that provides accurate and concise information about Henry Suarez Vaca, his work experience, technical skills, and personal background. Henry is a software developer with professional experience in React, Redux, Node.js, Express, MongoDB, Ant Design, AWS (including S3 and EC2), Socket.IO, and MercadoPago integration. He also has experience with Vite, PWAs, and TWA for Android deployment. Avoid long answers — keep responses short, clear, and factual. When asked about his work, describe his actual experience, tools, or technologies used. When asked about personal details, only provide neutral, relevant context (e.g., location, projects, or professional focus). Always answer in the same language as the question."
                    },
                    { role: "user", content: prompt }
                ],
            });

            const text = responsePrev.choices?.[0]?.message?.content.trim() || "Please try again later.";
            console.log("Gemini response:", text);
            createHistoryElement("AI", text);
        } catch (error) {
            createHistoryElement("APP");
        } finally {
            setLoading(false);
        }
    };

    return {
        askAI,
        history,
        loading,
        search,
        setSearch,
    };
};

export default useGemini;
