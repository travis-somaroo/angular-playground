import { Component, inject } from '@angular/core';
import { UserService } from '../../service/user.service';
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
  private userService = inject(UserService);

  protected errorMessage: string;

  users$ = this.userService.users$.pipe(
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );
}
