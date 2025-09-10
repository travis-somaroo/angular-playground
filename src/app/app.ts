import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, inject, OnInit, signal } from '@angular/core';
import { NgClass, UpperCasePipe } from '@angular/common';

interface Customer {
  firstName: string;
  lastName: string;
  emailAddress: string;
  status: 'active' | 'inactive';
}

function mapStatusToColor(status: 'active' | 'inactive'): string {
  console.warn('mapStatusToColor() running', status);
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
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App implements OnInit {
  readonly #cdr = inject(ChangeDetectorRef);

  protected count = 0;
  protected readonly data = signal<Customer>({
    firstName: 'John',
    lastName: 'Doe',
    emailAddress: 'john.doe@mail.com',
    status: 'active',
  });

  // runs only when `this.data()` changes, change detection won't run if there are no changes
  protected readonly status = computed(() => mapStatusToColor(this.data().status));


  public ngOnInit(): void {
    // setInterval(() => {
    //   this.count++; // won't update UI
    //   this.#cdr.markForCheck(); // will update UI - schedules the component to be checked in the next Angular CD cycle
    // }, 1000); // change detection will need to run manually
  }

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

  protected detectChanges(): void {
    this.#cdr.detectChanges(); // runs change detection immediately for the component and its children.
  }
}
