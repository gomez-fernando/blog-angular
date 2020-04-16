import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { global } from '../../services/global';

@Component({
  selector: 'app-post-new',
  // reutilizamos el template de post new
  templateUrl: '../post-new/post-new.component.html',
  providers: [UserService, CategoryService, PostService],
})
export class PostEditComponent implements OnInit {
  public pageTitle: string;
  public identity;
  public token;
  public post: Post;
  public categories;
  public status: string;
  public category;
  public user;
  public isEdit: boolean;
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
    private categoryService: CategoryService,
    private postService: PostService
  ) {
    this.pageTitle = 'Editar entrada';
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
    this.isEdit = true;
  }

  ngOnInit(): void {
    this.post = new Post(1, this.identity.sub, 1, '', '', null, null);
    this.getCategories();
    this.getPost();
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

  getPost() {
    // sacar el id del post de la url
    this.route.params.subscribe((params) => {
      let id = +params['id'];
      // console.log(id);

      // petición ajax para sacar los datos del post
      this.postService.getPost(id).subscribe(
        (response) => {
          if (response.status === 'success') {
            this.post = response.post;
            this.category = response.post.category;
            this.user = response.post.user;

            // console.log('response');
            // console.log(response);

            // console.log('post');
            // console.log(this.post);
            // console.log('categoria');
            // console.log(this.category);
            // console.log('usuario');
            // console.log(this.user);
          } else {
            this.router.navigate(['inicio']);
          }
        },
        (error) => {
          console.log(error as any);
          this.router.navigate(['inicio']);
        }
      );
    });
  }

  imageUpload(data) {
    let imageData = JSON.parse(data.response);
    this.post.image = imageData.image;
  }

  onSubmit(form) {
    // console.log(this.post);
    // console.log(this.postService.pruebas());
    this.postService.update(this.token, this.post, this.post.id).subscribe(
      (response) => {
        if (response.status === 'success') {
          // this.post = response.post;
          this.status = 'success';
          this.router.navigate(['/entrada', this.post.id]);
        } else {
          this.status = 'error';
        }
      },
      (error) => {
        console.log(error as any);
        this.status = 'error';
      }
    );
  }
}
