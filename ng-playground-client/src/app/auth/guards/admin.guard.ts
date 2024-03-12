import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../data-access/user.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const service = inject(UserService);
  const router = inject(Router);
  return service.isAdmin() ? true : router.navigateByUrl('/forbidden');
};
