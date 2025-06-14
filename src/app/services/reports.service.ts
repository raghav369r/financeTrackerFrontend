import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BACKENDURL } from '../config/constants';
import { Observable } from 'rxjs';
import Report from '../types/Report';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  private static readonly URL = BACKENDURL + 'transactionreport';
  constructor(private readonly httpClient: HttpClient) {}
  getReports(): Observable<Report> {
    return this.httpClient.get<Report>(ReportsService.URL);
  }
}
