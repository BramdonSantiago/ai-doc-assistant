import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./features/ai-assistant/pages/ai-assistant-page/ai-assistant-page.component').then(m => m.AiAssistantPageComponent)
    }
];
