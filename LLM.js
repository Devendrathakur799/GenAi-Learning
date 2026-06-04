import { GoogleGenAI } from "@google/genai";
import readlineSync from "readline-sync";

import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});
const History = [];

async function Chatting(userProblem) {

    try {

        History.push({
            role: "user",
            parts: [{ text: userProblem }]
        });

        const response =
        await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: History
        });

        History.push({
            role: "model",
            parts: [{ text: response.text }]
        });

        console.log("\nAI:", response.text);

    } catch (error) {

        console.log("Error:", error.message);

    }
}

async function main() {

    while (true) {

        const userProblem =
        readlineSync.question("\nYou: ");

        if (
            userProblem.toLowerCase() === "exit"
        ) {
            break;
        }

        await Chatting(userProblem);
    }
}

main();