import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Blog } from 'src/app/models/blog';
import { BlogCategoryService } from 'src/app/services/blog-category.service';
import { BlogService } from 'src/app/services/blog.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { NewBlogComponent } from '../new-blog/new-blog.component';
import { ViewBlogComponent } from '../view-blog/view-blog.component';

@Component({
  selector: 'app-blog-info',
  templateUrl: './blog-info.component.html',
  styleUrls: ['./blog-info.component.scss']
})
export class BlogInfoComponent implements OnInit {

  public blogDialogRef!: MatDialogRef<NewBlogComponent>;
  public displayedColumns: string[] = ['title', 'created', 'author', 'action'];
  public BlogData: any = [];
  public blogs_available: boolean = false;
  public dataSource: MatTableDataSource<Blog> | any;
  public selection = new SelectionModel<Blog>(true, []);
  @ViewChild('blog_paginator', { static: false }) blog_paginator!: MatPaginator;
  public pageSizeOptions: number[] = [];
  public pageEvent!: PageEvent;
  public pageSize = 100;
  public blog_category: any;
  public loading: boolean = false;


  constructor(
    private dialog: MatDialog,
    private notifier: NotifierService,
    private blogService: BlogService,
    private router: Router,
    private blogCategory: BlogCategoryService,
  ) { }

  ngOnInit(): void {
    this.getBlogs();
  }

  getBlogs() {
    this.loading = true;

    this.blogService.getAllBlogs().subscribe(data => {
      this.BlogData = data;

      if (this.BlogData.length > 0) {
        this.blogs_available = true;
      } else {
        this.blogs_available = false;
      }

      this.dataSource = new MatTableDataSource<Blog>(this.BlogData);
      setTimeout(() => {
        this.dataSource.paginator = this.blog_paginator;
        this.loading = false;
      }, 0);
    })
  }

  public applyFilter(filterValue: any) {
    this.dataSource.filter = filterValue.target.value.trim().toLowerCase();
    this.dataSource.paginator.firstPage();
  }

  //deleting blog
  deleteBlog(index: number, blog: any) {
    const data = this.dataSource.data;
    console.log('page index', this.blog_paginator.pageIndex)
    data.splice((this.blog_paginator.pageIndex * this.blog_paginator.pageSize) + index, 1);
    this.dataSource.data = data;
    this.blogService.deleteBlog(blog.id).subscribe()

    // get log category and update count
    this.updateBlogCategoryCounter(blog.category)
  }

  updateBlogCategoryCounter(blog_category_id: any) {
    this.blogCategory.getBlogCategoryById(blog_category_id).subscribe((returned: any) => {
      this.blog_category = returned;

      // update counter in blog category
      if (this.blog_category.counter) {
        const blog_coubet = Number(this.blog_category.counter - 1)
        this.blog_category.counter = blog_coubet;
      } else {
        this.blog_category.counter = 1
      }
      this.blogCategory.updateBlogCategory(this.blog_category).subscribe(returned => {

      })

    })
  }

  //confirm to delete blog
  confirmDialog(myindex: number, blog: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { width: '500px', data: "NB: This can not be undone" });

    dialogRef.updatePosition({
      top: '8%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteBlog(myindex, blog);

        this.notifier.Notification("success", "blog successfully deleted.");
      }
    });
  }

  openNewBlogDialog() {
    this.blogDialogRef = this.dialog.open(NewBlogComponent, {
      width: '80%', height: '90vh'
    });
    this.blogDialogRef.updatePosition({
      top: '2%',
    });

    this.blogDialogRef.afterClosed().subscribe(result => {
      this.getBlogs();
    });
  }

  openViewBlog(blog: any) {
    const viewBlogDialogRef = this.dialog.open(ViewBlogComponent, {
      width: '80%', height: '90vh', data: blog,
    });

    viewBlogDialogRef.updatePosition({
      top: '2%',
    });

  }

  editBlog(selected: any) {
    var myurl = `blog/${selected._id}`;

    this.router.navigateByUrl(myurl).then(e => {
      if (e) {
        console.log("Navigation is successful!");
      } else {
        console.log("Navigation has failed!");
      }
    });
  }

}
