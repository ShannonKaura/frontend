import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCandidateContactComponent } from './update-candidate-contact.component';

describe('UpdateCandidateContactComponent', () => {
  let component: UpdateCandidateContactComponent;
  let fixture: ComponentFixture<UpdateCandidateContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCandidateContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCandidateContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
