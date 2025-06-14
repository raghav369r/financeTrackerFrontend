import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  public constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let user = this.userService.userDetailsSubject.value;
    if (!user) return true;
    this.router.navigateByUrl('');
    return false;
  }
}
