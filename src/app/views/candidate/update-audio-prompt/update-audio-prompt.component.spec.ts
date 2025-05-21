import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAudioPromptComponent } from './update-audio-prompt.component';

describe('UpdateAudioPromptComponent', () => {
  let component: UpdateAudioPromptComponent;
  let fixture: ComponentFixture<UpdateAudioPromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAudioPromptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAudioPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
