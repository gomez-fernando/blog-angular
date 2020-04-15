import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { Post } from '../../models/post';
import { global } from '../../services/global';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css'],
  providers: [UserService, CategoryService],
})
export class PostNewComponent implements OnInit {
  public pageTitle: string;
  public identity;
  public token;
  public post: Post;
  public categories;
  public froalaOptions = {
    placeholderText: 'Escribe aquí tu post!',
    linkText: true,
    charCounterCount: true,
  };
  public afuConfig = {
    multiple: false,
    formatsAllowed: '.jpg,.png, .jpeg, .gif',
    maxSize: '20',
    uploadAPI: {
      url: global.url + 'post/upload',
      headers: {
        // 'Content-Type': 'text/plain;charset=UTF-8',
        Authorization: this.userService.getToken(),
      },
    },
    theme: 'attachPin',
    hideProgressBar: false,
    hideResetBtn: false,
    hideSelectBtn: false,
    attachPinText: 'Seleccionar archivo',
    replaceTexts: {
      selectFileBtn: 'Seleccionar archivo',
      resetBtn: 'Reset',
      uploadBtn: 'Subir',
      dragNDropBox: 'Suelta tu archivo aquí',
      attachPinBtn: 'Seleccionar archivos...',
      afterUploadMsg_success: 'Subido con éxito !',
      afterUploadMsg_error: 'Fallo al subir el archivo !',
    },
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private categoryService: CategoryService
  ) {
    this.pageTitle = 'Crear una entrada';
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
  }

  ngOnInit(): void {
    this.post = new Post(1, this.identity.sub, 1, '', '', null, null);
    this.getCategories();
    // console.log(this.post);
    // console.log('este user id : ' + this.identity.sub);
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(
      (response) => {
        if (response.status === 'success') {
          this.categories = response.categories;
          // console.log('categorias son: ');
          // console.log(this.categories);
        }
      },
      (error) => {
        console.log('error');
      }
    );
  }

  imageUpload(data) {
    let imageData = JSON.parse(data.response);
    this.post.image = imageData.image;
  }
}
