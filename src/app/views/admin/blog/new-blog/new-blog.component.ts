import { HttpEventType } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Blog } from 'src/app/models/blog';
import { BlogImage } from 'src/app/models/blog-image';
import { BlogCategoryService } from 'src/app/services/blog-category.service';
import { BlogImageService } from 'src/app/services/blog-image.service';
import { BlogService } from 'src/app/services/blog.service';
import { UserService } from 'src/app/services/user.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import Quill from "quill";
import BlotFormatter from "quill-blot-formatter";
import { BlogContentService } from 'src/app/services/blog-content.service';
import { BlogContent } from 'src/app/models/blog-content';

Quill.register('modules/blotFormatter', BlotFormatter);

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: UntypedFormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

interface Tag {
  name: string;
}

@Component({
  selector: 'app-new-blog',
  templateUrl: './new-blog.component.html',
  styleUrls: ['./new-blog.component.scss']
})
export class NewBlogComponent implements OnInit {

  public categories: any = [];
  public blog: Blog | any;
  public blogImage: BlogImage | any;
  public blogContent: BlogContent | any;
  public ImageBaseData: any;
  public imageName: string = '';
  public imageType: string = '';
  public file_selected: boolean = false;
  public show_format_message: boolean = false;
  public max_size_reached: boolean = false;
  public loading: boolean = false;
  public percentDone: number = 0;
  public saved_image: any;
  public matcher = new MyErrorStateMatcher();
  public preview: any = null;
  public user: any;
  public blog_category: any;
  public disabled_button: boolean = false;

  public tag: Tag = {
    name: ''
  };

  // @ViewChild('editor') editor;
  @ViewChild("editor", { static: true }) editor: ElementRef | any;
  htmlString: string = '';
  quillEditorRef: any;
  modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      [{ 'header': 1 }, { 'header': 2 }], // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }], // superscript/subscript
      [{ 'indent': '-1' }, { 'indent': '+1' }], // outdent/indent
      [{ 'direction': 'rtl' }], // text direction
      // [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      // [{ 'color': ['#2492D1', '#000000', '#616160'] }, { 'background': [] }], // dropdown with defaults from theme
      // [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean'], // remove formatting button
      ['link', 'image'], // link and image, video
    ],
    blotFormatter: {
      // empty object for default behaviour.
    }
  };

  onSelectionChanged = (event: any) => { }
  onContentChanged = (event: any) => {
    this.htmlString = event.html;
  }
  editorCreated(quill: any) { }

  constructor(
    private blogService: BlogService,
    private blogContentService: BlogContentService,
    private blogImageService: BlogImageService,
    private dialogRef: MatDialogRef<NewBlogComponent>,
    private blogCategory: BlogCategoryService,
    private tokenStorageService: TokenStorageService,
    private userService: UserService,
  ) {
  }

  ngOnInit(): void {
    this.getCategories();
    this.initBlog();
    this.getUser(this.tokenStorageService.getUser().id);
  }

  // get user by id
  getUser(id: any) {
    this.userService.getUserById(id).subscribe((user: any) => {
      this.user = user;

      console.log('user', this.user)
    })
  }

  getCategories() {
    this.blogCategory.getAllBlogCategorys().subscribe(returned => {
      this.categories = returned;
    })
  }

  initBlog() {
    this.blog = {
      _id: '',
      title: '',
      tags: [],
      caption: '',
      // content: '',
      photo_id: '',
      content_id: '',
      // photo: {
      //   image: '',
      //   filename: ''
      // },
      posted: '',
      author: '',
      category: "",
      created_date: new Date(Date.now()).getTime() / 1000,
      edited_by: '',
      edited_date: ""
    }

    this.blogImage = {
      _id: '',
      image: '',
      filename: ''
    }

    this.blogContent = {
      _id: '',
      content: ''
    }
  }

  // upload file as base 64
  handleFileInput(files: any) {

    const max_size = 0.5 //MB
    const me = this;
    const file = files.target.files[0];

    const reader = new FileReader();

    // File Preview
    const preview_reader = new FileReader();

    if (files.target.files[0]) {
      this.file_selected = true;
      // file size in MB
      const file_size = file.size / (1024 * 1024);

      if (file_size < max_size) {

        // File Preview
        preview_reader.onload = () => {
          this.preview = preview_reader.result as string;
        }
        preview_reader.readAsDataURL(file);

        reader.readAsDataURL(file);

        this.show_format_message = false;
        this.max_size_reached = false;

        reader.onload = function () {
          me.ImageBaseData = reader.result;
          me.imageName = file.name;
          me.imageType = file.type;

        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
      }
      else {
        this.max_size_reached = true;
      }
    } else {
      this.file_selected = false;
    }
  }

  AddTag() {
    this.blog.tags.push(this.tag.name);
    this.tag.name = '';
  }

  RemoveSelectedTag(tag: any) {
    this.blog.tags = this.blog.tags.filter((value: any) => {
      return value !== tag;
    });
  }

  addBlogContent(blog_content: any) {
    this.blogContentService.addBlogContent(blog_content).subscribe(blogContent => {
      this.blogContent = blogContent;
    })
  }

  addBlogImage() {
    this.blogImage.image = this.ImageBaseData;
    this.blogImage.filename = this.imageName
    const promise: any = new Promise((resolve, reject) => {
      return this.blogImageService.addBlogImage(this.blogImage).subscribe((event: any) => {

        switch (event.type) {
          case HttpEventType.Sent:
            console.log('Request has been made!');
            break;
          case HttpEventType.ResponseHeader:
            console.log('Response header has been received!');
            break;
          case HttpEventType.UploadProgress:
            this.percentDone = Math.round(event.loaded / event.total * 100);
            console.log(`Uploaded! ${this.percentDone}%`);
            break;
          case HttpEventType.Response:
            console.log('Image successfully created!', event.body);
            resolve(this.saved_image = event.body);
        }
      }, msg => {
        reject(msg)
      });
    });
    return promise;
  }

  // adding the image
  AddBlog(blog: any) {
    this.disabled_button = true;

    // add blog content to database
    this.blogContent.content = blog.content;
    this.addBlogContent(this.blogContent);

    this.addBlogImage().then((returned: any) => {
      blog.photo_id = returned.id;
      blog.content_id = this.blogContent._id;

      const author = {
        id: this.user.id,
        name: this.user.main_user_info.first_name + ' ' + this.user.main_user_info.last_name
      }
      blog.author = author;

      // blog.photo.image = this.ImageBaseData;
      // blog.photo.filename = this.imageName;

      const promise: any = new Promise((resolve, reject) => {
        return this.blogService.addBlog(blog).subscribe((event: any) => {

          switch (event.type) {
            case HttpEventType.Sent:
              console.log('Request has been made!');
              break;
            case HttpEventType.ResponseHeader:
              console.log('Response header has been received!');
              break;
            case HttpEventType.UploadProgress:
              this.percentDone = Math.round(event.loaded / event.total * 100);
              console.log(`Uploaded! ${this.percentDone}%`);
              break;
            case HttpEventType.Response:
              console.log('blog successfully created!', event.body);
              resolve(this.saved_image = event.body);

              // update blog category counter
              this.UpdateblogCategoryCounter(this.blog_category)
              this.disabled_button = false;
              this.close();
          }
        }, msg => {
          reject(msg)
        });
      });
      return promise;
    })
  }

  UpdateblogCategoryCounter(blog_category: any) {

    if (blog_category.counter) {
      const blog_coubet = Number(blog_category.counter + 1)
      blog_category.counter = blog_coubet;
    } else {
      blog_category.counter = 1
    }
    this.blogCategory.updateBlogCategory(blog_category).subscribe(returned => {

    })
  }

  changeCategories(event: any) {
    this.blogCategory.getBlogCategoryById(event.value).subscribe((returned: any) => {
      this.blog_category = returned;
    })
  }

  close() {
    this.dialogRef.close();
  }
}
