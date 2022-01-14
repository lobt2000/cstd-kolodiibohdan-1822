import { TestBed } from '@angular/core/testing';

import { IsAgentGuard } from './is-agent.guard';

describe('IsAgentGuard', () => {
  let guard: IsAgentGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsAgentGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
