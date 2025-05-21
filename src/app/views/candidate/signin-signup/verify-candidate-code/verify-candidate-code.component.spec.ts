import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyCandidateCodeComponent } from './verify-candidate-code.component';

describe('VerifyCandidateCodeComponent', () => {
  let component: VerifyCandidateCodeComponent;
  let fixture: ComponentFixture<VerifyCandidateCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyCandidateCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyCandidateCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
