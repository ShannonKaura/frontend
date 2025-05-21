import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustryInfoComponent } from './industry-info.component';

describe('IndustryInfoComponent', () => {
  let component: IndustryInfoComponent;
  let fixture: ComponentFixture<IndustryInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndustryInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndustryInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
