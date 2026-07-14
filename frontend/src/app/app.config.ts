import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { provideMarkdown } from 'ngx-markdown';

import { provideHttpClient, withXhr } from '@angular/common/http';



export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withXhr()), provideMarkdown(), provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)],
};
