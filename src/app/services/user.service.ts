import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly URL = 'http://localhost:5211/api/user';

  public constructor(private readonly httpClient: HttpClient) {}

  login(parmas: any): Observable<{ token: string }> {
    return this.httpClient.post<{ token: string }>(this.URL + '/login', parmas);
  }
  
  register(parmas: any): Observable<{ token: string }> {
    return this.httpClient.post<{ token: string }>(
      this.URL + '/register',
      parmas
    );
  }
}
