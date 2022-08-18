import { TestBed } from '@angular/core/testing';

import { TubeDataApiV3Service } from './tube-data-api-v3.service';

describe('TubeDataApiV3Service', () => {
  let service: TubeDataApiV3Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TubeDataApiV3Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
