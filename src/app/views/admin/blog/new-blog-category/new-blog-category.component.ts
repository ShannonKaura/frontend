import { Component, EventEmitter, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BlogCategory } from 'src/app/models/blog-category';
import { BlogCategoryService } from 'src/app/services/blog-category.service';
import { NotifierService } from 'src/app/services/notifier.service';

@Component({
  selector: 'app-new-blog-category',
  templateUrl: './new-blog-category.component.html',
  styleUrls: ['./new-blog-category.component.scss']
})
export class NewBlogCategoryComponent implements OnInit {

  public blogCategory!: BlogCategory;
  public onBlogCategoryCreation = new EventEmitter();
  public maxDate: Date = new Date();
  public hide = true;

  constructor(
    private blogCategoryService: BlogCategoryService,
    private dialogRef: MatDialogRef<NewBlogCategoryComponent>,
    private notifier: NotifierService,
  ) { }

  ngOnInit(): void {
    this.initBlogCategory();
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

  // add blogCategory to database
  addBlogCategory(blogCategory: BlogCategory) {
    this.blogCategoryService.addBlogCategory(blogCategory).subscribe(createdBlogCategory => {
      this.onBlogCategoryCreation.emit(blogCategory);

      if (createdBlogCategory) {
        this.notifier.Notification("success", "new blogCategory successfully saved.");
        this.close()
      } else {
        this.notifier.Notification("warning", "failed to save.");
      }
    })
  }

  close() {
    this.dialogRef.close();
  }

}

