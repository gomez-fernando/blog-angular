import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [PostService, UserService],
})
export class ProfileComponent implements OnInit {
  public pageTitle: string;
  public status: string;
  public url;
  public identity;
  public token;
  public user: User;
  public posts: Array<Post>;

  constructor(
    private postService: PostService,
    public userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.pageTitle = `Posts del usuario`;
    this.url = global.url;
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
    // this.id = this.identity.sub;
    // this.pageTitle = `Posts de: ${this.identity.name} ${this.identity.surname}`;
  }

  ngOnInit() {
    this.getMyPosts();
    // console.log('id:');
    // console.log(this.id);
  }

  getMyPosts() {
    // sacar el id del post de la url
    this.route.params.subscribe((params) => {
      let userId = +params['id'];
      // console.log(id);
      this.getUser(userId);
      this.getPosts(userId);
    });
  }

  getUser(userId) {
    this.userService.getUser(userId).subscribe(
      (response) => {
        if (response.status === 'success') {
          this.status = response.status;
          this.user = response.user;

          // console.log('estos son los user');
          // console.log(this.user);
        }
      },
      (error) => {
        console.log(error as any);
      }
    );
  }

  getPosts(userId) {
    this.userService.getPosts(userId).subscribe(
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
        this.getMyPosts();
      },
      (error) => {
        console.log(error as any);
      }
    );
  }
}
