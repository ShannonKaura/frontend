import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCandidateSkillComponent } from './edit-candidate-skill.component';

describe('EditCandidateSkillComponent', () => {
  let component: EditCandidateSkillComponent;
  let fixture: ComponentFixture<EditCandidateSkillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCandidateSkillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCandidateSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
