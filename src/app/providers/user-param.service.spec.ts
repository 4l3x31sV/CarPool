import { TestBed } from '@angular/core/testing';

import { UserParamService } from './user-param.service';

describe('UserParamService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserParamService = TestBed.get(UserParamService);
    expect(service).toBeTruthy();
  });
});
