import { Component, inject } from '@angular/core';
import { UserListService } from '../../service/user-list.service';
import { catchError, EMPTY } from 'rxjs';
import { DropdownModule } from 'primeng/dropdown';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    DropdownModule,
    AsyncPipe
  ],
  templateUrl: 'user-list.component.html'
})
export class UserListComponent {
  private userService = inject(UserListService);

  errorMessage = '';

  usersWithTodos$ = this.userService.usersWithTodos1$.pipe(
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );
}
