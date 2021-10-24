import { TestBed } from '@angular/core/testing';

import { kysGuard } from './kys.guard';

describe('KysGuard', () => {
  let guard: kysGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(kysGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
