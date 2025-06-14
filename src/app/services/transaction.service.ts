import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Transaction from '../types/Transaction';
import { BACKENDURL } from '../config/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private static readonly URL = BACKENDURL + 'transaction';
  constructor(private readonly httpClient: HttpClient) {}
  getAllTransactions(queryParams: any): Observable<Transaction[]> {
    return this.httpClient.get<Transaction[]>(TransactionService.URL, {
      params: queryParams,
    });
  }

  addTransaction(body: any): Observable<Transaction> {
    return this.httpClient.post<Transaction>(TransactionService.URL, body);
  }

  updateTransaction(body: Transaction): Observable<Transaction> {
    return this.httpClient.put<Transaction>(TransactionService.URL, body);
  }

  deleteTransaction(id: number): Observable<void> {
    return this.httpClient.delete<void>(TransactionService.URL + `/${id}`);
  }
}
