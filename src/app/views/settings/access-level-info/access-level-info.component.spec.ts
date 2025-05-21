import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessLevelInfoComponent } from './access-level-info.component';

describe('AccessLevelInfoComponent', () => {
  let component: AccessLevelInfoComponent;
  let fixture: ComponentFixture<AccessLevelInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessLevelInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessLevelInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
