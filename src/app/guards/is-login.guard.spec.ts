import { Route } from '@angular/compiler/src/core';
import { TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';


import { IsLoginGuard } from './is-login.guard';

describe('IsLoginGuard', () => {
  let guard: IsLoginGuard;
  let router: Router;
  let route: ActivatedRouteSnapshot;
  let state: RouterStateSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, BrowserAnimationsModule]
    });
    guard = TestBed.inject(IsLoginGuard);
    router = TestBed.inject(Router)
  });

  it('should be created', () => {
    guard.canActivate(route, state)
    expect(guard).toBeTruthy();
  });

  it('should check login', () => {
    localStorage.setItem('mainuser', JSON.stringify({ userPos: 'user' }))
    expect(guard.checkLogin()).toBeTruthy();
  });

  it('should check login', () => {
    localStorage.clear();
    expect(guard.checkLogin()).toBeFalse();
  });

});