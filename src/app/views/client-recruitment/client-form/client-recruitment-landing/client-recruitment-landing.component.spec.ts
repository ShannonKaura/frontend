import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientRecruitmentLandingComponent } from './client-recruitment-landing.component';

describe('ClientRecruitmentLandingComponent', () => {
  let component: ClientRecruitmentLandingComponent;
  let fixture: ComponentFixture<ClientRecruitmentLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientRecruitmentLandingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientRecruitmentLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
