import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientLandingComponent } from './client-landing.component';

describe('ClientLandingComponent', () => {
  let component: ClientLandingComponent;
  let fixture: ComponentFixture<ClientLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientLandingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
