import { TestBed } from '@angular/core/testing';

import { KysGuard } from './kys.guard';

describe('KysGuard', () => {
  let guard: KysGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(KysGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
