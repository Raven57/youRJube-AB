import { TestBed } from '@angular/core/testing';

import { SubscribeServiceService } from './subscribe-service.service';

describe('SubscribeServiceService', () => {
  let service: SubscribeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubscribeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
