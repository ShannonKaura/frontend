import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestCreatePasswordComponent } from './guest-create-password.component';

describe('GuestCreatePasswordComponent', () => {
  let component: GuestCreatePasswordComponent;
  let fixture: ComponentFixture<GuestCreatePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuestCreatePasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestCreatePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
