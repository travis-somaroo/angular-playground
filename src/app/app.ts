import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, inject, OnInit, signal } from '@angular/core';
import { NgClass, UpperCasePipe } from '@angular/common';
import { mapStatusToColor } from './status-mapper-util';
import { StatusColorPipe } from './status-color-pipe';

interface Customer {
  firstName: string;
  lastName: string;
  emailAddress: string;
  status: 'active' | 'inactive';
}

@Component({
  selector: 'app-root',
  imports: [
    NgClass,
    UpperCasePipe,
    StatusColorPipe
  ],
  templateUrl: './app.html',
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

  protected updateCustomer(): void {
    this.data.update(d => ({ ...d, firstName: 'Travis', lastName: 'Somaroo', emailAddress: 'travis@mail.com' }));
  }

  protected detectChanges(): void {
    this.#cdr.detectChanges(); // runs change detection immediately for the component and its children.
  }

}
