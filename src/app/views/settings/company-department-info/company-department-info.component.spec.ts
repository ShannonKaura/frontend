import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDepartmentInfoComponent } from './company-department-info.component';

describe('CompanyDepartmentInfoComponent', () => {
  let component: CompanyDepartmentInfoComponent;
  let fixture: ComponentFixture<CompanyDepartmentInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyDepartmentInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyDepartmentInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
