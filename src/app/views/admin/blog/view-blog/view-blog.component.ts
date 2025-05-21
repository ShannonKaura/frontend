import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { BlogImageService } from 'src/app/services/blog-image.service';
import { BlogService } from 'src/app/services/blog.service';
import { NotifierService } from 'src/app/services/notifier.service';

@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.scss']
})
export class ViewBlogComponent implements OnInit {

  public blog: any = [];
  public content: any;
  public imageSelectedFileBLOB: any;
  public title = '';
  public author = '';
  public posted_date: any;

  constructor(
    private blogService: BlogService,
    private blogImage: BlogImageService,
    @Inject(MAT_DIALOG_DATA) public blogdatainfo: any,
    private notifier: NotifierService,
    private sanitizer: DomSanitizer
  ) {
    this.content = this.blogdatainfo.content;
    this.title = this.blogdatainfo.title;
    this.author = this.blogdatainfo.author.name;
    this.posted_date = this.blogdatainfo.created_date;

    var timestamp = this.blogdatainfo.created_date;
    this.posted_date = new Date(timestamp);
  }

  ngOnInit(): void {
    this.getBlog();
  }

  getBlog() {
    const blogId = this.blogdatainfo.id
    if (blogId) {
      this.blogService.getBlogById(blogId).subscribe(returnedblog => {
        this.blog = returnedblog;

        // get blog main photo
        this.blogImage.getBlogImageById(this.blog.photo_id).subscribe(returned => {
          const image_base64 = returned.image;
          const image_name = returned.filename;

          // coverting base64 string to file
          this.imageDataURLtoFile(image_base64, image_name);
        })
      })
    }
  }

  imageDataURLtoFile(dataurl: any, filename: any) {
    const url = dataurl;
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];

    fetch(url)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], filename, { type: mime });

        let url = window.URL.createObjectURL(file);

        this.imageSelectedFileBLOB = this.sanitizer.bypassSecurityTrustUrl(url);

      })
  }

}
