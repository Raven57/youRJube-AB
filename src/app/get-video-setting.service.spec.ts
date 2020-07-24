import { TestBed } from '@angular/core/testing';

import { GetVideoSettingService } from './get-video-setting.service';

describe('GetVideoSettingService', () => {
  let service: GetVideoSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetVideoSettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
