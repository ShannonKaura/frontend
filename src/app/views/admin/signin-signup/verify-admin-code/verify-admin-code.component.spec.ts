import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyAdminCodeComponent } from './verify-admin-code.component';

describe('VerifyAdminCodeComponent', () => {
  let component: VerifyAdminCodeComponent;
  let fixture: ComponentFixture<VerifyAdminCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyAdminCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyAdminCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
