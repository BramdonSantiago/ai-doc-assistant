const client = require("../config/llm");
const prompts = require("../prompts");
const AppError = require("../errors/AppError");

const askLLM = async ({ task, messages }) => {
    const systemPrompt = prompts[task] ?? prompts.documentation;

    try {

        const completion = await client.chat.completions.create({

            model: "llama-3.1-8b-instant",

            messages: [
                {
                    role: "system",
                    content: systemPrompt
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