import { TestBed } from '@angular/core/testing';

import { FormCritiqueService } from './form-critique.service';

describe('FormCritiqueService', () => {
  let service: FormCritiqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormCritiqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
