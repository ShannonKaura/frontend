import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAppliedCandidateComponent } from './view-applied-candidate.component';

describe('ViewAppliedCandidateComponent', () => {
  let component: ViewAppliedCandidateComponent;
  let fixture: ComponentFixture<ViewAppliedCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAppliedCandidateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAppliedCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
