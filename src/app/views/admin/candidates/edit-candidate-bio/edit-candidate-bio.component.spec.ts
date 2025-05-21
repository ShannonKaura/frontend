import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCandidateBioComponent } from './edit-candidate-bio.component';

describe('EditCandidateBioComponent', () => {
  let component: EditCandidateBioComponent;
  let fixture: ComponentFixture<EditCandidateBioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCandidateBioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCandidateBioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
