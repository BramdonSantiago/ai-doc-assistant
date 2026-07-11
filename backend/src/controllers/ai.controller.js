const llmService = require("../services/llm.service");
const { validateMessages } = require("../validators/chat.validator");
const AppError = require("../errors/AppError");

const {
    getConversation,
    saveConversation
} = require("../conversations/conversation.store");


const chat = async (req, res, next) => {

    try {

        const {
            conversationId,
            message,
            task,
        } = req.body;


        if (!conversationId) {
            throw new AppError(
                "conversationId is required",
                400
            );
        }


        if (!message) {
            throw new AppError(
                "message is required",
                400
            );
        }


        const history = getConversation(conversationId);


        const messages = [
            ...history,
            {
                role: "user",
                content: message
            }
        ];


        const answer = await llmService.askLLM({ task, messages });


        const updatedHistory = [
            ...messages,
            {
                role: "assistant",
                content: answer
            }
        ];


        saveConversation(
            conversationId,
            updatedHistory
        );


        res.json({
            conversationId,
            answer
        });


    } catch(error) {

        next(error);

    }

};


module.exports = {
    chat
};