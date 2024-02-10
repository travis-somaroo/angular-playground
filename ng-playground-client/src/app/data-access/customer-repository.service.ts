import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, combineLatest, map, Observable, Subject, switchMap, tap } from 'rxjs';
import { Customer } from '../model/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerRepository {
  private readonly http = inject(HttpClient);
  private page = new Subject<number>();
  private pageSize = new Subject<number>();
  private totalRecords = new BehaviorSubject(0);

  page$ = this.page.asObservable();
  size$ = this.pageSize.asObservable();
  totalRecords$ = this.totalRecords.asObservable();

  customers$: Observable<Customer[]> = combineLatest([
    this.page$,
    this.size$
  ]).pipe(
    switchMap(([page, size]) => this.fetchAllCustomers$(page, size).pipe(
      tap(console.log),
      tap((res: any) => this.setTotalRecords(res.totalElements)),
      map((res: any) => res.content as Customer[])
    ))
  );

  setCurrentPage(page: number) {
    this.page.next(page);
  }

  setPageSize(size: number) {
    this.pageSize.next(size);
  }

  setTotalRecords(total: number) {
    this.totalRecords.next(total);
  }

  fetchAllCustomers$(page: number, size: number) {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);
    return this.http.get('http://localhost:8080/api/customers', {params});
  }

}
