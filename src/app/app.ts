import { Component, computed, signal } from '@angular/core';
import { NgClass, UpperCasePipe } from '@angular/common';

interface Customer {
  firstName: string;
  lastName: string;
  emailAddress: string;
  status: 'active' | 'inactive';
}

function mapStatusToColor(status: 'active' | 'inactive'): string {
  console.log('mapStatusToColor() running', status);
  const colors: Record<string, string> = {
    active: 'bg-green-100 text-green-500',
    inactive: 'bg-red-100 text-red-500',
  };
  return colors[status];
}

@Component({
  selector: 'app-root',
  imports: [
    NgClass,
    UpperCasePipe
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly data = signal<Customer>({
    firstName: 'John',
    lastName: 'Doe',
    emailAddress: 'john.doe@mail.com',
    status: 'active',
  });

  // runs only when `this.data()` changes
  protected readonly status = computed(() => mapStatusToColor(this.data().status));

  // get called everytime change detection runs - done by angular
  protected getStatus(status: 'active' | 'inactive'): string {
    return mapStatusToColor(status);
  }

  protected markAsInactive(): void {
    if (this.data().status === 'active') {
      this.data.update(d => ({ ...d, status: 'inactive' }));
    } else {
      this.data.update(d => ({ ...d, status: 'active' }));
    }
  }

}
