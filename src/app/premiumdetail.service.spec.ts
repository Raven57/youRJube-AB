import { TestBed } from '@angular/core/testing';

import { PremiumdetailService } from './premiumdetail.service';

describe('PremiumdetailService', () => {
  let service: PremiumdetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PremiumdetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
