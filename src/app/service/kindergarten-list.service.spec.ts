import { TestBed } from '@angular/core/testing';

import { KindergartenListService } from './kindergarten-list.service';

describe('KindergartenListService', () => {
  let service: KindergartenListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KindergartenListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
