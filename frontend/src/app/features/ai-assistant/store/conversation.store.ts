import { Injectable, signal, computed, effect, inject, DestroyRef, viewChild } from '@angular/core';
import { Conversation } from '../models/conversation.model';
import { TaskType } from '../models/task-type.model';
import { ChatMessage } from '../models/chat-message.model';
import { ConnectionStatus } from '../models/connection-status.model';

@Injectable({
    providedIn: 'root'
})

export class ConversationStore {
    readonly connectionStatus = signal<ConnectionStatus>('online');

    private readonly _conversations = signal<Conversation[]>([]);
    private readonly _currentConversationId = signal<string | null>(null);

    private readonly STORAGE_KEY = 'ai-doc-assistant-conversations';

    private readonly ACTIVE_CONVERSATION_KEY = 'ai-doc-assistant-current-conversation';

    readonly conversations = this._conversations.asReadonly();


    readonly currentConversation = computed(() =>
        this._conversations().find(
            conversation =>
                conversation.id === this._currentConversationId()
        ) ?? null
    );

    readonly messages = computed(() =>
        this.currentConversation()?.messages ?? []
    );


    readonly recentConversations = computed(() =>

        [...this._conversations()]
            .sort(
                (a, b) =>
                    b.updatedAt.getTime() -
                    a.updatedAt.getTime()
            )
            .slice(0, 5)

    );

    readonly sortedConversations = computed(() =>
        [...this._conversations()].sort(
            (a, b) =>
                b.updatedAt.getTime() - a.updatedAt.getTime()
        )
    );

    constructor() {

        this.load();

        if (this._conversations().length === 0) {
            this.createConversation('documentation');
        }

        this.initializePersistence();

    }

    createConversation(task: TaskType): void {

        const conversation: Conversation = {
            id: crypto.randomUUID(),
            title: 'Nueva conversación',
            task,
            messages: [],
            createdAt: new Date(),
            updatedAt: new Date()
        };

        this._conversations.update(conversations => [
            ...conversations,
            conversation
        ]);

        this._currentConversationId.set(conversation.id);

    }

    selectConversation(id: string): void {

        const conversationExists = this._conversations()
            .some(conversation => conversation.id === id);

        if (!conversationExists) {
            return;
        }

        this._currentConversationId.set(id);

    }

    setMessages(messages: ChatMessage[]): void {

    }

    addMessage(message: ChatMessage): void {

        const currentConversationId = this._currentConversationId();

        if (!currentConversationId) {
            return;
        }


        this._conversations.update(conversations =>

            conversations.map(conversation => {

                if (conversation.id !== currentConversationId) {
                    return conversation;
                }

                return {
                    ...conversation,
                    messages: [
                        ...conversation.messages,
                        message
                    ],
                    updatedAt: new Date()
                };

            })

        );


    }

    updateTitle(title: string): void {
        const currentConversationId = this._currentConversationId();

        if (!currentConversationId) {
            return;
        }

        this._conversations.update(conversations =>

            conversations.map(conversation => {

                if (conversation.id !== currentConversationId) {
                    return conversation;
                }
                if (conversation.title !== 'Nueva conversación') {
                    return conversation;
                }

                return {
                    ...conversation,
                    title,
                    updatedAt: new Date()
                };

            })

        );

    }

    updateTitleFromPrompt(prompt: string): void {

        this.updateTitle(
            this.generateTitle(prompt)
        );

    }

    private generateTitle(prompt: string): string {

        const title = prompt.trim();

        if (title.length <= 40) {
            return title;
        }

        return `${title.slice(0, 40)}...`;

    }

    deleteConversation(id: string): void {

    }

    private initializePersistence(): void {

        effect(() => {

            this.persist();

        });

    }

    private persist(): void {

        localStorage.setItem(
            this.STORAGE_KEY,
            JSON.stringify(this._conversations())
        );

        localStorage.setItem(
            this.ACTIVE_CONVERSATION_KEY,
            this._currentConversationId() ?? ''
        );

    }

    private load(): void {

        const storedConversations =
            localStorage.getItem(this.STORAGE_KEY);

        const currentConversationId =
            localStorage.getItem(this.ACTIVE_CONVERSATION_KEY);

        if (storedConversations) {

            const conversations: Conversation[] =
                JSON.parse(storedConversations).map(
                    (conversation: Conversation) => ({
                        ...conversation,
                        createdAt: new Date(conversation.createdAt),
                        updatedAt: new Date(conversation.updatedAt)
                    })
                );

            this._conversations.set(conversations);

        }

        if (currentConversationId) {

            this._currentConversationId.set(
                currentConversationId
            );

        }

    }
}
