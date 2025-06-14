import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtdecodeService } from './jwtdecode.service';
import User from '../types/User';
import { TOKEN } from '../config/constants';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private static readonly URL = 'http://localhost:5211/api/user';

  public constructor(
    private readonly httpClient: HttpClient,
    private readonly jwtService: JwtdecodeService,
    private readonly router: Router
  ) {}

  userDetailsSubject = new BehaviorSubject<User | null>(null);
  userDetails = this.userDetailsSubject.asObservable();

  updateSubject(token?: string): void {
    let jwttoken = token || localStorage.getItem(TOKEN) || '';
    this.userDetailsSubject.next(this.jwtService.decodeToken(jwttoken));
  }

  login(parmas: any): Observable<{ token: string }> {
    return this.httpClient.post<{ token: string }>(
      UserService.URL + '/login',
      parmas
    );
  }

  register(parmas: any): Observable<{ token: string }> {
    return this.httpClient.post<{ token: string }>(
      UserService.URL + '/register',
      parmas
    );
  }

  logout(): void {
    localStorage.removeItem(TOKEN);
    this.userDetailsSubject.next(null);
    this.router.navigateByUrl('/login');
  }
}
