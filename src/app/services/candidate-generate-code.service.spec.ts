import { TestBed } from '@angular/core/testing';

import { CandidateGenerateCodeService } from './candidate-generate-code.service';

describe('CandidateGenerateCodeService', () => {
  let service: CandidateGenerateCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandidateGenerateCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
