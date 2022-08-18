import { TestBed } from '@angular/core/testing';

import { ProviderVideoService } from './provider-video.service';

describe('ProviderVideoService', () => {
  let service: ProviderVideoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProviderVideoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
