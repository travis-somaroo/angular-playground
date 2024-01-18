import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { UserFacadePush } from './user-facade-push';
import { Observable } from 'rxjs';
import { UserState } from './user';

@Component({
  selector: 'app-push-based-arch',
  standalone: true,
  imports: [
    AsyncPipe,
    ButtonModule,
    FormsModule,
    InputTextModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './push-based-arch.component.html',
  styleUrl: './push-based-arch.component.scss'
})
export class PushBasedArchComponent implements OnInit {
  searchTerm: FormControl;
  showButton = true;

  public facade = inject(UserFacadePush);

  vm$: Observable<UserState> = this.facade.vm$;

  ngOnInit() {
    const {criteria} = this.facade.getStateSnapshot();

    this.searchTerm = this.facade.buildSearchTermControl();
    this.searchTerm.patchValue(criteria, {emitEvent: false});
  }

  getPageSize() {
    this.showButton = false;
  }

}
