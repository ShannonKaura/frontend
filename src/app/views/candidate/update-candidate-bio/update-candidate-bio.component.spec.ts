import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCandidateBioComponent } from './update-candidate-bio.component';

describe('UpdateCandidateBioComponent', () => {
  let component: UpdateCandidateBioComponent;
  let fixture: ComponentFixture<UpdateCandidateBioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCandidateBioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCandidateBioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
