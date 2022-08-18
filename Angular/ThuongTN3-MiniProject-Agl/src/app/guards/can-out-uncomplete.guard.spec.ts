import { TestBed } from '@angular/core/testing';

import { CanOutUncompleteGuard } from './can-out-uncomplete.guard';

describe('CanOutUncompleteGuard', () => {
  let guard: CanOutUncompleteGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanOutUncompleteGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
