import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSelectedVacancyComponent } from './view-selected-vacancy.component';

describe('ViewSelectedVacancyComponent', () => {
  let component: ViewSelectedVacancyComponent;
  let fixture: ComponentFixture<ViewSelectedVacancyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSelectedVacancyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSelectedVacancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
