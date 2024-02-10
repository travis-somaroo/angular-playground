import { Component, inject } from '@angular/core';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { CustomerRepository } from '../data-access/customer-repository.service';
import { AsyncPipe } from '@angular/common';
import { Customer } from '../model/customer';

@Component({
  selector: 'app-customer-table',
  standalone: true,
  imports: [
    TableModule,
    AsyncPipe
  ],
  templateUrl: './customer-table.component.html',
})
export class CustomerTableComponent {
  customerRepository = inject(CustomerRepository);

  page!: number;
  size!: number;

  loadCustomers(event: TableLazyLoadEvent) {
    this.page = (event.first / event.rows);
    this.size = event.rows;
    this.customerRepository.setCurrentPage(this.page);
    this.customerRepository.setPageSize(this.size);
  }
}
