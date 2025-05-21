import { TestBed } from '@angular/core/testing';

import { AdminGenerateCodeService } from './admin-generate-code.service';

describe('AdminGenerateCodeService', () => {
  let service: AdminGenerateCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminGenerateCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
