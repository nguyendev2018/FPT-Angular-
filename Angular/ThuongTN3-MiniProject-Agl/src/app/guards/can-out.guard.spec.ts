import { TestBed } from '@angular/core/testing';

import { CanOutGuard } from './can-out.guard';

describe('CanOutGuard', () => {
  let guard: CanOutGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanOutGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
