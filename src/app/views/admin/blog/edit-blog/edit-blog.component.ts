import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import Quill from 'quill';
import BlotFormatter from 'quill-blot-formatter';
import { Blog } from 'src/app/models/blog';
import { BlogContent } from 'src/app/models/blog-content';
import { BlogImage } from 'src/app/models/blog-image';
import { BlogCategoryService } from 'src/app/services/blog-category.service';
import { BlogContentService } from 'src/app/services/blog-content.service';
import { BlogImageService } from 'src/app/services/blog-image.service';
import { BlogService } from 'src/app/services/blog.service';
import { NotifierService } from 'src/app/services/notifier.service';

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
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.scss']
})
export class EditBlogComponent implements OnInit {

  public blog: any = [];
  public preview: any = null;
  public max_size_reached: boolean = false;
  public file_selected: boolean = false;
  public loading: boolean = false;
  public percentDone: number = 0;
  public categories: any = [];
  public matcher = new MyErrorStateMatcher();
  public show_format_message: boolean = false;
  public ImageBaseData: any;
  public imageName: string = '';
  public imageType: string = '';
  public blog_category: any;
  public image = [];
  public content = [];
  public blogImage: BlogImage | any;
  public blogContent: BlogContent | any;

  public tag: Tag = {
    name: ''
  };

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

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private blogImageService: BlogImageService,
    private blogContentService: BlogContentService,
    private notifier: NotifierService,
    private blogCategory: BlogCategoryService,
  ) { }

  ngOnInit(): void {
    this.getBlog();
    this.getCategories();
    this.initBlog();
  }

  initBlog() {
    this.blog = {
      _id: '',
      title: '',
      tags: [],
      caption: '',
      photo_id: '',
      content_id: '',
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


  getBlog() {
    const blogId: any = this.route.snapshot.paramMap.get('id');
    this.blogService.getBlogById(blogId).subscribe(returned => {
      this.blog = returned;

      // get image
      this.getBlogImage(this.blog.photo_id);

      // get content
      this.getBlogContent(this.blog.content_id)
    })
  }

  getBlogImage(image_id: any) {
    this.blogImageService.getBlogImageById(image_id).subscribe((returned_image_data: any) => {

      // preview image
      this.preview = returned_image_data.image;
    })
  }

  getBlogContent(content_id: any) {
    this.blogContentService.getBlogContentById(content_id).subscribe((returned_content: any) => {
      this.content = returned_content.content;
    })
  }

  updateBlogContent(blog: any) {
    this.blogContent._id = blog.content_id;
    this.blogContent.content = this.content;
    this.blogContentService.updateBlogContent(this.blogContent).subscribe(() => {
    })
  }

  updateBlogImage(blog: any) {
    this.blogImage._id = blog.photo_id;
    this.blogImage.image = this.preview;
    this.blogImageService.updateBlogImage(this.blogImage).subscribe(() => {
    })
  }

  updateBlog(blog: Blog) {
    this.blogService.updateBlog(blog).subscribe(() => {

      // update blog content
      this.updateBlogContent(blog);
      this.updateBlogImage(blog)
      this.notifier.Notification("success", "blog successfully updated.");
    })
  }

  getCategories() {
    this.blogCategory.getAllBlogCategorys().subscribe(returned => {
      this.categories = returned;
    })
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

  changeCategories(event: any) {
    console.log(event.value)
    this.blogCategory.getBlogCategoryById(event.value).subscribe((returned: any) => {
      this.blog_category = returned;
    })
  }

}
