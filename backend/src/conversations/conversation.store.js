const conversations = new Map();


const getConversation = (conversationId) => {

    return conversations.get(conversationId) || [];

};


const saveConversation = (conversationId, messages) => {

    conversations.set(conversationId, messages);

};


module.exports = {
    getConversation,
    saveConversation
};