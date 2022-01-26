import { TestBed } from '@angular/core/testing';

import { KindergartenApplicationService } from './kindergarten-application.service';

describe('KindergartenApplicationService', () => {
  let service: KindergartenApplicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KindergartenApplicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
