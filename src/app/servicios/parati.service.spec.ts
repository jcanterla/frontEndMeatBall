import { TestBed } from '@angular/core/testing';

import { ParatiService } from './parati.service';

describe('ParatiService', () => {
  let service: ParatiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParatiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
