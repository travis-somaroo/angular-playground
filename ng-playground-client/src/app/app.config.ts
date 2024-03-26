import { ApplicationConfig, ErrorHandler, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CustomErrorHandler } from './demo-01/error/custom-error-handler.service';
import { MessageService } from 'primeng/api';
import { todoRequestInterceptor } from './demo-02/user/interceptor/user-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    MessageService,
    provideRouter(routes),
    //provideHttpClient(withInterceptors([globalErrorHandlerInterceptor])),
    provideHttpClient(withInterceptors([todoRequestInterceptor])),
    importProvidersFrom([BrowserModule, BrowserAnimationsModule]),
    {
      // If this class is provided, use the custom one instead.
      provide: ErrorHandler,
      useClass: CustomErrorHandler
    },
  ]
};
