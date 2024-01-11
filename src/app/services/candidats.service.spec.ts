import { TestBed } from '@angular/core/testing';

import { CandidatService } from './candidats.service';

describe('CandidatsService', () => {
  let service: CandidatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandidatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
