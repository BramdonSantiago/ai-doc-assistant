import { TaskType } from './task-type.model';

export interface AssistantOption {
    // id: TaskType;
    // label: string;
    // description: string;
    // icon: string;

    id: TaskType;
    label: string;
    icon: string;
    description: string;
    placeholder: string;
    emptyState: string;
}