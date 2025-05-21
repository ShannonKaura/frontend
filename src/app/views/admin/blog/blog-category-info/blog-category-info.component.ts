import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { BlogCategory } from 'src/app/models/blog-category';
import { BlogCategoryService } from 'src/app/services/blog-category.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { EditBlogCategoryComponent } from '../edit-blog-category/edit-blog-category.component';
import { NewBlogCategoryComponent } from '../new-blog-category/new-blog-category.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-category-info',
  templateUrl: './blog-category-info.component.html',
  styleUrls: ['./blog-category-info.component.scss']
})
export class BlogCategoryInfoComponent implements OnInit {

  public blogCategoryDialogRef!: MatDialogRef<NewBlogCategoryComponent>;
  public displayedColumns: string[] = ['name', 'action'];
  public dataSource!: MatTableDataSource<BlogCategory> | any;
  public selection = new SelectionModel<BlogCategory>(true, []);
  public dialogRef: MatDialogRef<any> | undefined;
  public blogCategory!: BlogCategory;
  public BlogCategoryData: any = [];
  @ViewChild('blog_category_paginator', { static: false }) blog_category_paginator!: MatPaginator;
  public pageSizeOptions: number[] = [];
  public pageEvent!: PageEvent;
  public pageSize = 100;
  public blog_categories_available: boolean = false;
  public loading: boolean = false;


  constructor(
    private dialog: MatDialog,
    private blogCategoryService: BlogCategoryService,
    private notifier: NotifierService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getBlogCategorys();
  }

  //create new blogCategory
  openNewBlogCategoryDialog() {
    this.blogCategoryDialogRef = this.dialog.open(NewBlogCategoryComponent, { width: '50%', maxHeight: '620px' });
    this.blogCategoryDialogRef.updatePosition({
      top: '4%',
    });

    this.blogCategoryDialogRef.afterClosed().subscribe(result => {
      this.getBlogCategorys();
    });
  }

  //get blogCategorys from database
  getBlogCategorys() {
    this.loading = true;

    this.blogCategoryService.getAllBlogCategorys().subscribe(data => {
      this.BlogCategoryData = data;

      if (this.BlogCategoryData.length > 0) {
        this.blog_categories_available = true;
      } else {
        this.blog_categories_available = false;
      }


      this.dataSource = new MatTableDataSource<BlogCategory>(this.BlogCategoryData);
      setTimeout(() => {
        this.dataSource.paginator = this.blog_category_paginator;
        this.loading = false;
      }, 0);
    })
  }

  public applyFilter(filterValue: any) {
    this.dataSource.filter = filterValue.target.value.trim().toLowerCase();
    this.dataSource.paginator.firstPage();
  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach((row: any) => this.selection.select(row));
  }

  //deleting blogCategory
  deleteBlogCategory(index: number, e: any) {
    const data = this.dataSource.data;
    console.log('page index', this.blog_category_paginator.pageIndex)
    data.splice((this.blog_category_paginator.pageIndex * this.blog_category_paginator.pageSize) + index, 1);
    this.dataSource.data = data;
    this.blogCategoryService.deleteBlogCategory(e.id).subscribe()
  }


  //confirm to delete blogCategory
  confirmDialog(myindex: number, e: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { width: '500px', data: "NB: This can not be undone" });

    dialogRef.updatePosition({
      top: '8%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteBlogCategory(myindex, e);
        this.notifier.Notification("success", "user successfully deleted.");
      }
    });
  }

  //update blogCategory
  openEditBlogCategory(selected: any): void {
    const dialogRef = this.dialog.open(EditBlogCategoryComponent, {
      width: '50%',
      maxHeight: '620px',
      data: selected,
    });

    dialogRef.updatePosition({
      top: '4%',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getBlogCategorys();
    });
  }

}

