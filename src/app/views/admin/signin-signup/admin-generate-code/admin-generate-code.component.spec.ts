import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGenerateCodeComponent } from './admin-generate-code.component';

describe('AdminGenerateCodeComponent', () => {
  let component: AdminGenerateCodeComponent;
  let fixture: ComponentFixture<AdminGenerateCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGenerateCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGenerateCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
