import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ChipsModule } from 'primeng/chips';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UserFacade } from './user-facade';
import { User } from './user';
import { debounceTime, distinctUntilChanged, Observable, tap } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { AsyncPipe, NgClass, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-pull-based-arch',
  standalone: true,
  imports: [
    ChipsModule,
    ReactiveFormsModule,
    ButtonModule,
    NgForOf,
    NgClass,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './pull-based-arch.component.html',
  styleUrl: './pull-based-arch.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PullBasedArchComponent implements OnInit {
  userFacade = inject(UserFacade);

  showButton = true;
  pagination = this.userFacade.pagination;
  searchTerm = new FormControl();
  users$: Observable<User[]>;

  ngOnInit() {
    this.searchTerm.patchValue(this.userFacade.criteria, {emitEvent: false});

    const userChanges$ = this.searchTerm.valueChanges.pipe(
      tap(_ => this.users$ = null),
      debounceTime(300),
      distinctUntilChanged(),
    );

    userChanges$.subscribe(value => {
      this.userFacade.updateSearchCriteria(value);
      this.loadUsers();
    });
  }

  loadUsers() {
    this.users$ = this.userFacade.findAllUsers$();
  }

  updatePagination(pageSize: number) {
    this.userFacade.updatePagination(pageSize);
    this.pagination = this.userFacade.pagination;
  }

  getPageSize() {
    this.pagination = this.userFacade.pagination;
    this.showButton = false;
  }

}
