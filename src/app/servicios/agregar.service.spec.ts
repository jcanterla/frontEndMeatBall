import { TestBed } from '@angular/core/testing';

import { AgregarService } from './agregar.service';

describe('AgregarService', () => {
  let service: AgregarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgregarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
