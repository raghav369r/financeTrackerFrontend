import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Transaction from '../types/Transaction';
import { BACKENDURL } from '../config/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  URL=BACKENDURL+"transaction"
  constructor(private readonly httpClient: HttpClient) {}
  getAllTransactions(): Observable<Transaction[]> {
    return this.httpClient.get<Transaction[]>(this.URL);
  }

  addTransaction(body: any): Observable<void> {
    return this.httpClient.post<void>(this.URL, body);
  }
}
