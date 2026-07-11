import { TaskType } from './task-type.model';

export interface ChatRequest {
    conversationId: string;
    task: TaskType;
    message: string;
}