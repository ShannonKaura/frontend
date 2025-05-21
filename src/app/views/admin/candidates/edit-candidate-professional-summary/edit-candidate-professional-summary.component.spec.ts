import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCandidateProfessionalSummaryComponent } from './edit-candidate-professional-summary.component';

describe('EditCandidateProfessionalSummaryComponent', () => {
  let component: EditCandidateProfessionalSummaryComponent;
  let fixture: ComponentFixture<EditCandidateProfessionalSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCandidateProfessionalSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCandidateProfessionalSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
