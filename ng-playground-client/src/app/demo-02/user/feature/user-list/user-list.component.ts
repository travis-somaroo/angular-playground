import { Component, inject } from '@angular/core';
import { UserListService } from '../../service/user-list.service';
import { catchError, EMPTY, tap } from 'rxjs';
import { DropdownModule } from 'primeng/dropdown';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    DropdownModule,
    AsyncPipe,
    NgForOf,
    NgIf
  ],
  templateUrl: 'user-list.component.html',
  styleUrl: 'user-list.component.scss'
})
export class UserListComponent {
  private userService = inject(UserListService);

  errorMessage = '';

  usersWithTodos$ = this.userService.usersWithTodos4$.pipe(
    tap(console.log),
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );
}
