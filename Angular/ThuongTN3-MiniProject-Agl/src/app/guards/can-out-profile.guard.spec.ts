import { TestBed } from '@angular/core/testing';

import { CanOutProfileGuard } from './can-out-profile.guard';

describe('CanOutProfileGuard', () => {
  let guard: CanOutProfileGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanOutProfileGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
