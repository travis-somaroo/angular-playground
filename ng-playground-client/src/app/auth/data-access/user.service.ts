import { Injectable, signal } from '@angular/core';

export interface User {
  name: string;
  surname: string;
  role: Role;
}

export enum Role {
  ADMIN = 'admin',
  SIMPLE_USER = 'simple_user',
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  $user = signal<User>({
    name: 'Travis',
    surname: 'Somaroo',
    role: Role.ADMIN
  });

  isAdmin(): boolean {
    return this.$user().role.includes(Role.ADMIN);
  }
}
