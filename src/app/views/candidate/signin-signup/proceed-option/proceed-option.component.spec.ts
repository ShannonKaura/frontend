import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProceedOptionComponent } from './proceed-option.component';

describe('ProceedOptionComponent', () => {
  let component: ProceedOptionComponent;
  let fixture: ComponentFixture<ProceedOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProceedOptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProceedOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
