import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import User from '../types/User';

@Injectable({
  providedIn: 'root',
})
export class JwtdecodeService {
  constructor() {}
  decodeToken(token: string): null | User {
    if (!token || token == '') return null;
    try {
      let decoded = jwtDecode<User>(token);
      if (new Date(decoded.exp) > new Date()) return null;
      return decoded;
    } catch (ex) {
      console.log(ex);
      return null;
    }
  }
}
