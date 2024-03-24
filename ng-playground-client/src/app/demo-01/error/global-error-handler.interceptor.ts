import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, retry, throwError, timer } from 'rxjs';

export const globalErrorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    retry({
      count: 3,
      delay: (error, retryCount) => timer(retryCount * 1000)
    }),
    catchError(err => {
      console.log('Error handled by HTTP interceptor...');
      return throwError(() => {
        console.log('Error rethrown by HTTP interceptor...');
        return err;
      });
    })
  );
};
