import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperLandingComponent } from './developer-landing.component';

describe('DeveloperLandingComponent', () => {
  let component: DeveloperLandingComponent;
  let fixture: ComponentFixture<DeveloperLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeveloperLandingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeveloperLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
