import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCandidatePasswordComponent } from './update-candidate-password.component';

describe('UpdateCandidatePasswordComponent', () => {
  let component: UpdateCandidatePasswordComponent;
  let fixture: ComponentFixture<UpdateCandidatePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCandidatePasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCandidatePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
