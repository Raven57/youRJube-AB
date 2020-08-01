import { TestBed } from '@angular/core/testing';

import { TogglePopupService } from './toggle-popup.service';

describe('TogglePopupService', () => {
  let service: TogglePopupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TogglePopupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
