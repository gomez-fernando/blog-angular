import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [PostService, UserService],
})
export class HomeComponent implements OnInit {
  public pageTitle: string;
  public status: string;
  public url;
  public identity;
  public token;
  public posts: Array<Post>;

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
    this.getPosts();
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
