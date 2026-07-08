export interface ChatMessage {

    role:
    'user'
    | 'assistant'
    | 'system';

    content: string;

}


export interface ChatRequest {

    conversationId: string;

    message: string;

}


export interface ChatResponse {

    conversationId: string;

    answer: string;

}