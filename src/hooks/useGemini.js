import { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import env from "react-dotenv";
import { v4 as uuidv4 } from "uuid";

import data from "../data.json";

const apiToken = env.GEMINI_TOKEN;
const initialPrompt = `You must answer like my personal assistant and provide 
information about my job experience as software developer and my personal information,
 i will provide a JSON object with all my data (Henry Suarez VAca), data: ${JSON.stringify(
   data,
 )}. Aswer this question: `;
const endPrompt =
  "Only answer the question if it's related to my job experience or about me. If you can't answer, say 'I can't answer that; please try another question'";

const useGemini = () => {
  const [search, setSearch] = useState("");
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

  const askAI = async (prompt) => {
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      createHistoryElement("AI", text);
    } catch (error) {
      createHistoryElement("APP");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (search) {
      askAI(`${initialPrompt}${search}${endPrompt}`);
      setSearch("");
    }
  }, [history]);

  return {
    search,
    setSearch,
    history,
    loading,
    setLoading,
    createHistoryElement,
  };
};

export default useGemini;
