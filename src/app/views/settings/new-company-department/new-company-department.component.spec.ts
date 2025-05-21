import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCompanyDepartmentComponent } from './new-company-department.component';

describe('NewCompanyDepartmentComponent', () => {
  let component: NewCompanyDepartmentComponent;
  let fixture: ComponentFixture<NewCompanyDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCompanyDepartmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCompanyDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
