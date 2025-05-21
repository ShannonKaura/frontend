import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BlogCategory } from 'src/app/models/blog-category';
import { BlogCategoryService } from 'src/app/services/blog-category.service';
import { NotifierService } from 'src/app/services/notifier.service';

@Component({
  selector: 'app-edit-blog-category',
  templateUrl: './edit-blog-category.component.html',
  styleUrls: ['./edit-blog-category.component.scss']
})
export class EditBlogCategoryComponent implements OnInit {

  public blogCategory!: BlogCategory;
  public maxDate: Date = new Date();
  public hide = true;

  constructor(
    private blogCategoryService: BlogCategoryService,
    @Inject(MAT_DIALOG_DATA) public blogCategorydatainfo: any,
    private dialogRef: MatDialogRef<EditBlogCategoryComponent>,
    private notifier: NotifierService,
  ) { }

  ngOnInit(): void {
    this.initBlogCategory();
    this.getBlogCategory();
  }

  // initialize blogCategory model
  initBlogCategory() {
    this.blogCategory = {
      _id: '',
      counter: 0,
      name: '',
      created_by: '',
      created_date: new Date(Date.now()).getTime() / 1000,
    }
  }

  // get blogCategory by Id
  getBlogCategory() {
    const blogCategoryId = this.blogCategorydatainfo.id
    if (blogCategoryId) {
      this.blogCategoryService.getBlogCategoryById(blogCategoryId).subscribe(returnedblogCategory => {
        this.blogCategory = returnedblogCategory;
      })
    }
  }

  //update blogCategory
  updateBlogCategory(blogCategory: BlogCategory) {
    this.blogCategoryService.updateBlogCategory(blogCategory).subscribe(updatedBlogCategory => {
      this.blogCategory = updatedBlogCategory;

      if (this.blogCategory) {
        this.notifier.Notification("success", "blogCategory successfully updated.");
        this.dialogRef.close();
      } else {
        this.notifier.Notification("warning", "failed to save.");
      }
    })
  }

  close() {
    this.dialogRef.close();
  }
}

