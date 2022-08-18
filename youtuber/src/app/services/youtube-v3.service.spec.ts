import { TestBed } from '@angular/core/testing';

import { YoutubeV3Service } from './youtube-v3.service';

describe('YoutubeV3Service', () => {
  let service: YoutubeV3Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YoutubeV3Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
