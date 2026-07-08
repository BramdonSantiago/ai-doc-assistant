const client = require("../config/llm");
const documentationPrompt = require("../prompts/documentation.prompt");
const AppError = require("../errors/AppError");

const askLLM = async (messages) => {

    try {

        const completion = await client.chat.completions.create({

            model: "llama-3.1-8b-instant",

            messages: [
                {
                    role: "system",
                    content: documentationPrompt
                },
                ...messages
            ],

            temperature: 0.3
        });


        return completion.choices[0].message.content;


    } catch (error) {

        console.error("LLM Provider Error:", error);


        throw new AppError(
            "The AI service is currently unavailable",
            503
        );

    }

};


module.exports = {
    askLLM
};