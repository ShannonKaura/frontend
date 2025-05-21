import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCandidateSkillComponent } from './update-candidate-skill.component';

describe('UpdateCandidateSkillComponent', () => {
  let component: UpdateCandidateSkillComponent;
  let fixture: ComponentFixture<UpdateCandidateSkillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCandidateSkillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCandidateSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
