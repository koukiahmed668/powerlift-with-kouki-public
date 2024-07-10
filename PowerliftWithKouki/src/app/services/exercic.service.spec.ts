import { TestBed } from '@angular/core/testing';

import { ExercicService } from './exercic.service';

describe('ExercicService', () => {
  let service: ExercicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExercicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
