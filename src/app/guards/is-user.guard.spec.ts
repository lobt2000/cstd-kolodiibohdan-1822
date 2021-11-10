import { TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { IsUserGuard } from './is-user.guard';

describe('IsUserGuard', () => {
  let guard: IsUserGuard;
  let router: Router;
  let route: ActivatedRouteSnapshot;
  let state: RouterStateSnapshot;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, BrowserAnimationsModule]
    });
    guard = TestBed.inject(IsUserGuard);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    guard.canActivate(route, state)
    expect(guard).toBeTruthy();
  });

  it('should check user type', () => {
    localStorage.setItem('mainuser', JSON.stringify({ userPos: 'user' }))
    expect(guard.checkUsertype()).toBeTruthy();
  });

  it('should check user type', () => {
    localStorage.setItem('mainuser', JSON.stringify({ userPos: 'agent' }))
    expect(guard.checkUsertype()).toBeFalse();
  });
});