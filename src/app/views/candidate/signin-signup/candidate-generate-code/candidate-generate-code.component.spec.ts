import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateGenerateCodeComponent } from './candidate-generate-code.component';

describe('CandidateGenerateCodeComponent', () => {
  let component: CandidateGenerateCodeComponent;
  let fixture: ComponentFixture<CandidateGenerateCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateGenerateCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateGenerateCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
