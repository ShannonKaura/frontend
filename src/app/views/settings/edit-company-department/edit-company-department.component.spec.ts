import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCompanyDepartmentComponent } from './edit-company-department.component';

describe('EditCompanyDepartmentComponent', () => {
  let component: EditCompanyDepartmentComponent;
  let fixture: ComponentFixture<EditCompanyDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCompanyDepartmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCompanyDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
