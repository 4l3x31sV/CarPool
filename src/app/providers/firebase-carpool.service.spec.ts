import { TestBed } from '@angular/core/testing';

import { FirebaseCarpoolService } from './firebase-carpool.service';

describe('FirebaseCarpoolService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirebaseCarpoolService = TestBed.get(FirebaseCarpoolService);
    expect(service).toBeTruthy();
  });
});
