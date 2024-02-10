import { Component, inject } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { InputNumberInputEvent } from 'primeng/inputnumber';
import { CustomerRepository } from '../data-access/customer-repository.service';
import { AsyncPipe, NgForOf } from '@angular/common';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [
    PaginatorModule,
    AsyncPipe,
    NgForOf
  ],
  templateUrl: './customer-list.component.html',
})
export class CustomerListComponent {
  customerRepository = inject(CustomerRepository);


  onSetCurrentPage(event: InputNumberInputEvent) {
    this.customerRepository.setCurrentPage(+event.value);
  }

  onSetPageSize(event: InputNumberInputEvent) {
    this.customerRepository.setPageSize(+event.value);
  }
}
