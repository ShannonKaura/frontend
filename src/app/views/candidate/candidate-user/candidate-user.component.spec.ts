import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateUserComponent } from './candidate-user.component';

describe('CandidateUserComponent', () => {
  let component: CandidateUserComponent;
  let fixture: ComponentFixture<CandidateUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
