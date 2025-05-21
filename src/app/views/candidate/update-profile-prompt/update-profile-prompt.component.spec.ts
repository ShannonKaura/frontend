import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProfilePromptComponent } from './update-profile-prompt.component';

describe('UpdateProfilePromptComponent', () => {
  let component: UpdateProfilePromptComponent;
  let fixture: ComponentFixture<UpdateProfilePromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateProfilePromptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProfilePromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
