import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ChildGuard implements CanActivateChild {
  public constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) {}
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    let user = this.userService.userDetailsSubject.value;
    if (user) return true;
    this.router.navigateByUrl('/login');
    return false;
  }
}
