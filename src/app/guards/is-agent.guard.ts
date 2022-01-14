import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsAgentGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkUsertype();
  }

  checkUsertype() {
    let userType = JSON.parse(localStorage.getItem('mainuser')).userPos
    if (userType !== "agent") {
      this.router.navigate(['/login']);
      return false;
    } else if (userType === "user") {
      this.router.navigate(['user'])
      return true;
    } else {
      return true;
    }
  }

}
