import { TestBed } from '@angular/core/testing';

import { RestrictionServiceService } from './restriction-service.service';

describe('RestrictionServiceService', () => {
  let service: RestrictionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestrictionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
