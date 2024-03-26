import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToDo, User, UserData } from '../model/user';
import { catchError, delayWhen, forkJoin, map, mergeMap, of, retry, retryWhen, scan, tap, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserListService {
  private http = inject(HttpClient);

  userUrl = User.userUrl;
  userUrlErr = User.userUrlErr;

  // Try 1: Catch and rethrow, outer pipe
  // If an error occurs, doesn't display any data
  usersWithTodos1$ = this.http.get<User[]>(this.userUrl).pipe(
    mergeMap(users => forkJoin(users.map(user =>
      this.http.get<ToDo[]>(`${this.userUrl}/${user.id}/todos`)
        .pipe(
          map(todos => ({
            user,
            todos
          } as UserData))))
    )),
    catchError(User.handleError)
  );

  // Try 2: Catch and rethrow, both pipes
  // If an error occurs, doesn't display any data
  usersWithTodos2$ = this.http.get<User[]>(this.userUrl).pipe(
    mergeMap(users => forkJoin(users.map(user =>
      this.http.get<ToDo[]>(`${this.userUrl}/${user.id}/todos`)
        .pipe(
          map(todos => ({
            user,
            todos
          } as UserData)),
          catchError(User.handleError)))
    )),
    catchError(User.handleError)
  );

  // Try 3: Catch and continue
  // If an error occurs, displays data for user with no todos
  // Will *not* re-catch in the UI to display a message
  usersWithTodos3$ = this.http.get<User[]>(this.userUrl).pipe(
    mergeMap(users => forkJoin(users.map(user =>
      this.http.get<ToDo[]>(`${this.userUrl}/${user.id}/todos`)
        .pipe(
          map(todos => ({
            user,
            todos
          } as UserData)),
          catchError(err => of({
            user,
            todos: []
          } as UserData))))
    )));

  // ? Try 4: Catch and continue and return message to UI (What we want)
  usersWithTodos4$ = this.http.get<User[]>(this.userUrl).pipe(
    mergeMap(users => forkJoin(users.map(user =>
      this.http.get<ToDo[]>(`${this.userUrl}/${user.id}/todos`)
        .pipe(
          map(todos => ({
            user,
            todos
          } as UserData)),
          catchError(err => of({
            user,
            todos: [],
            message: `Error retrieving todos for user: ${user.name}`
          } as UserData))))
    )));

  // ? Try 5: Retry
  usersWithTodos5$ = this.http.get<User[]>(this.userUrl).pipe(
    mergeMap(users => forkJoin(users.map(user =>
      this.http.get<ToDo[]>(`${this.userUrl}/${user.id}/todos`)
        .pipe(
          map(todos => ({
            user,
            todos
          } as UserData)),
          retry(3),
          catchError(err => of({
            user,
            todos: [],
            message: `Error retrieving todos for user: ${user.name}`
          } as UserData))))
    )));

  // ? Try 6: RetryWhen
  usersWithTodos6$ = this.http.get<User[]>(this.userUrl).pipe(
    mergeMap(users => forkJoin(users.map(user =>
      this.http.get<ToDo[]>(`${this.userUrl}/${user.id}/todos`)
        .pipe(
          map(todos => ({
            user,
            todos
          } as UserData)),
          retryWhen(error =>
            error.pipe(
              scan((acc, error) => {
                if (acc > 3) {
                  throw error;
                }
                return acc + 1;
              }, 1),
              // Extend the delay between retries
              delayWhen(value => timer(value * 500)),
              tap(value => console.log("Retry: ", value))
            )
          ),
          catchError(err => {
              console.log("Caught error");
              return of({
                user,
                todos: [],
                message: `Error retrieving todos for user: ${user.name}`
              } as UserData);
            }
          )))
    )));

}
