import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsLoginGuard implements CanActivate, CanLoad {
  constructor(private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLogin();
  }
  private checkLogin(): boolean {
    if (!localStorage.getItem('mainuser')) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
    // console.log('re');
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    if (!localStorage.getItem('mainuser')) {
      return true;
    } else {
      return false;
    }
  }
}
