import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  @Input() posts;
  @Input() identity;
  @Input() url;

  public pageTitle: string;
  public status: string;
  public token;

  constructor(
    private postService: PostService,
    public userService: UserService
  ) {
    this.pageTitle = 'Inicio';
    this.url = global.url;
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
  }

  ngOnInit(): void {
    console.log(this.identity);
  }

  getPosts() {
    this.postService.getPosts().subscribe(
      (response) => {
        if (response.status === 'success') {
          this.status = response.status;
          this.posts = response.posts;

          console.log('estos son los posts');
          console.log(this.posts);
        }
      },
      (error) => {
        console.log(error as any);
      }
    );
  }

  deletePost(id) {
    this.postService.delete(this.token, id).subscribe(
      (response) => {
        this.getPosts();
      },
      (error) => {
        console.log(error as any);
      }
    );
  }
}
