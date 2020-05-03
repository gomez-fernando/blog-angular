import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers: [PostService, UserService],
})
export class PostDetailComponent implements OnInit {
  @Input() url;

  public post: Post;
  public category;
  public user;
  public identity;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.identity = this.userService.getIdentity();
    this.url = global.url;
  }

  ngOnInit(): void {
    this.getPost();
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

            console.log('response');
            console.log(response);

            console.log('post');
            console.log(this.post);
            console.log('categoria');
            console.log(this.category);
            console.log('usuario');
            console.log(this.user);
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
}
