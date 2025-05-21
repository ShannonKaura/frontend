import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogCategoryInfoComponent } from './blog-category-info.component';

describe('BlogCategoryInfoComponent', () => {
  let component: BlogCategoryInfoComponent;
  let fixture: ComponentFixture<BlogCategoryInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogCategoryInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogCategoryInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
