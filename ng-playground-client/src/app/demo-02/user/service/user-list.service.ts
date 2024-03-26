import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToDo, User, UserData } from '../model/user';
import { catchError, forkJoin, map, mergeMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserListService {
  private http = inject(HttpClient);

  userUrl = User.userUrl;
  userUrlErr = User.userUrlErr;

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

}
