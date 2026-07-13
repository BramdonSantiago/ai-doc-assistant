import { Routes } from '@angular/router';
import { AppLayoutComponent } from './shared/layouts/app-layout/app-layout.component';

export const routes: Routes = [
    {
        path: '',
        component: AppLayoutComponent,
        children: [

            {
                path: 'chat',
                loadComponent: () => import('./features/ai-assistant/pages/ai-assistant-page/ai-assistant-page.component').then(m => m.AiAssistantPageComponent)
            },

            {
                path: 'history',
                loadComponent: () => import('./features/history/pages/history-page/history-page.component').then(m => m.HistoryPageComponent)
            },
            {
                path: '',
                redirectTo: 'chat',
                pathMatch: 'full'
            }

        ]
    }
];
