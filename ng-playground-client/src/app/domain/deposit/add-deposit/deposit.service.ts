import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JsonFormSchema } from '../../../shared/json-form/json-form.model';

@Injectable({
  providedIn: 'root'
})
export class DepositService {
  private http = inject(HttpClient);

  getSchema$(): Observable<JsonFormSchema> {
    return this.http.get<JsonFormSchema>('assets/data/schema.json');
  }
}
