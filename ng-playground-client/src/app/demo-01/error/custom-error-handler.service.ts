import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {

  constructor(private messageService: MessageService, private zone: NgZone) {
  }

  /**
   * In this example we are using try catch to handle async errors (not ideal), but angular delegates to global handler out of its execution context (zone js)
   * Since the class should replace the global handler we need to ensure that it runs in the execution content for change detection to occur.
   * <br>
   * Demo by moving the code in and out of the run method.
   */
  handleError(error: unknown) {
    this.zone.run(() => {
      this.messageService.add({
        key: 'global',
        severity: 'error',
        summary: 'Error',
        detail: 'An error as detected.'
      });
    });
    console.warn('Caught by CustomErrorHandler:', error);
  }
}
