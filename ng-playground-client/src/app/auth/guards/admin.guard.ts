import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../data-access/user.service';

export const adminGuard: CanActivateFn = (route, state) => {
  return inject(UserService).isAdmin() ? true : inject(Router).navigateByUrl('/forbidden');
};
