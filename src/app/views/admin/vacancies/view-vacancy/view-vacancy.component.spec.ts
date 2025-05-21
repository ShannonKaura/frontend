import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVacancyComponent } from './view-vacancy.component';

describe('ViewVacancyComponent', () => {
  let component: ViewVacancyComponent;
  let fixture: ComponentFixture<ViewVacancyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewVacancyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewVacancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
