const VALID_ROLES = ["system", "user", "assistant"];

const validateMessages = (messages) => {

    if (!messages) {
        return "messages is required.";
    }

    if (!Array.isArray(messages)) {
        return "messages must be an array.";
    }

    if (messages.length === 0) {
        return "messages cannot be empty.";
    }

    for (const message of messages) {

        if (typeof message !== "object") {
            return "Each message must be an object.";
        }

        if (!message.role) {
            return "Each message must contain a role.";
        }

        if (!VALID_ROLES.includes(message.role)) {
            return `Invalid role '${message.role}'.`;
        }

        if (!message.content) {
            return "Each message must contain content.";
        }

        if (typeof message.content !== "string") {
            return "content must be a string.";
        }

        if (message.content.trim().length === 0) {
            return "content cannot be empty.";
        }
    }

    return null;
};

module.exports = {
    validateMessages
};