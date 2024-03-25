import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user.model';
import { catchError, map, Observable, tap, throwError } from 'rxjs';

const USERS_URL = 'https://dummyjson.com/users1';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);

  // ? Scenario 1: Catch and rethrow the error.
  users$ = this.http.get<User[]>(USERS_URL).pipe(
    tap(console.log),
    map(res => res.users),
    // ! If we error output a replacement observable
    catchError(this.errorHandler)
  );

  // ? Never omits not values or completes. Good for returned an observable when an error occurs
  private errorHandler(err: any): Observable<never> {
    console.log(err);
    // * In a real world app, we may send the server to some remote logging infrastructure.
    // * Instead of just logging it to the console.
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // * A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // * The backend returned an unsuccessful response code.
      // * The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.message}`;
    }
    console.error(err);
    return throwError(() => new Error(errorMessage));
  }

}
