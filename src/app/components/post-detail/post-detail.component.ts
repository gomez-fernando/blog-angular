import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers: [PostService],
})
export class PostDetailComponent implements OnInit {
  public post: Post;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

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
            this.post = response.posts;
            console.log(this.post);
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
