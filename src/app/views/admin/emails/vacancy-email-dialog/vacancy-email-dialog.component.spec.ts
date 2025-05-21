import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacancyEmailDialogComponent } from './vacancy-email-dialog.component';

describe('VacancyEmailDialogComponent', () => {
  let component: VacancyEmailDialogComponent;
  let fixture: ComponentFixture<VacancyEmailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacancyEmailDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacancyEmailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
