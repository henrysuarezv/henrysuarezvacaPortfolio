import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { Input } from "antd";
import { GoogleGenerativeAI } from "@google/generative-ai";
import data from "../../data.json";
import "./assistantComponent.scss";
import ChatComponent from "./chatComponent";
import { v4 as uuidv4 } from 'uuid';
import env from "react-dotenv";

const apiToken = env.GEMINI_TOKEN;
const { Search } = Input;
const AssistantComponent = () => {
    const [search, setSearch] = useState("");
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    const genAI = new GoogleGenerativeAI(apiToken);
    const initialPrompt =
        "I will provide a Json object where is resumed my job experiencie as software developer (work period, name projects, skills, etc) and also personal information about me " +
        JSON.stringify(data) +
        ", answer this question: ";
    const endPrompt =
        "only aswer the question if is related to my job experiencie or about me. If you can not answer just say 'I cant answer that, please try other question'";
    const askAI = async (prompt) => {
        setLoading(true);
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const result = await model.generateContent(prompt);
            console.log(result);
            const response = result.response;
            const text = response.text();

            setHistory((prevHistory) => [
                ...prevHistory,
                {
                    role: "AI",
                    text: text,
                    key: uuidv4()
                },
            ]);
        } catch (e) {
            setHistory((prevHistory) => [
                ...prevHistory,
                {
                    role: "app",
                    text: "Please try again later.",
                    key: uuidv4()
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleInput = () => {
        setHistory((prevHistory) => [
            ...prevHistory,
            {
                role: "user",
                text: search,
                key: uuidv4()
            },
        ]);
        askAI(initialPrompt + search + endPrompt);
        setSearch("");
    };

    useEffect(() => { }, []);

    return (
        <Card
            title="AI assistant"
            actions={[
                <Search
                    placeholder="ask something about my experience"
                    value={search}
                    style={{ paddingLeft: 15, paddingRight: 15 }}
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                    onSearch={handleInput}
                    enterButton="Search"
                    size="large"
                    loading={false}
                />,
            ]}
            style={{ width: 400, height: 400, zIndex: 5 }}
        >
            <ChatComponent
                history={history}
                loading={loading}
                setLoading={setLoading}
                setHistory={() => setHistory}
            />
        </Card>
    );
};

export default AssistantComponent;
