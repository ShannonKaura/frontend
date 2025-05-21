import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBlogCategoryComponent } from './new-blog-category.component';

describe('NewBlogCategoryComponent', () => {
  let component: NewBlogCategoryComponent;
  let fixture: ComponentFixture<NewBlogCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewBlogCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBlogCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
