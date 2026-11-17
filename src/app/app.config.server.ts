import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { CONTENT_LOADER } from './core/services/content-loader';
import { serverContentLoader } from './core/services/content-loader.server';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    // Overrides the browser's fetch-based loader during prerendering.
    { provide: CONTENT_LOADER, useFactory: serverContentLoader },
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
