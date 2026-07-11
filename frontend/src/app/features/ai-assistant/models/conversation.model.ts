import { ChatMessage } from './chat-message.model';
import { TaskType } from './task-type.model';

export interface Conversation {

    id: string;

    title: string;

    task: TaskType;

    messages: ChatMessage[];

    createdAt: Date;

    updatedAt: Date;

}