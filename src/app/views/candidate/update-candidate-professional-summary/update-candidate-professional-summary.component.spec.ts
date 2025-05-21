import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCandidateProfessionalSummaryComponent } from './update-candidate-professional-summary.component';

describe('UpdateCandidateProfessionalSummaryComponent', () => {
  let component: UpdateCandidateProfessionalSummaryComponent;
  let fixture: ComponentFixture<UpdateCandidateProfessionalSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCandidateProfessionalSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCandidateProfessionalSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
