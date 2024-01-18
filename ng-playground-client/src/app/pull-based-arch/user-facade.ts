import { inject, Injectable } from '@angular/core';
import { Pagination, RandomUserResponse, User } from './user';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserFacade {
  private http = inject(HttpClient);

  users: User[] = [];
  criteria: string = 'ngDominican';
  pagination: Pagination = {
    selectedSize: 5,
    currentPage: 0,
    pageSizes: [5, 10, 20, 50]
  };

  findAllUsers$(): Observable<User[]> {
    const url = buildUserUrl(this.criteria, this.pagination);
    return this.http.get<RandomUserResponse>(url).pipe(
      map(response => response.results),
      tap(list => this.users = list)
    );
  }

  updatePagination(selectedSize: number) {
    this.pagination = {
      ...this.pagination,
      selectedSize
    };
  }

  updateSearchCriteria(criteria: string) {
    this.criteria = criteria;
    console.log('Updated Search Criteria: ', this.criteria);
  }

}

function buildUserUrl(criteria: string, pagination: Pagination): string {
  const URL = 'https://randomuser.me/api/';
  const currentPage = `page=${pagination.currentPage}`;
  const pageSize = `results=${pagination.selectedSize}&`;
  const searchFor = `seed=${criteria}`;

  return `${URL}?${searchFor}&${pageSize}&${currentPage}`;
}

