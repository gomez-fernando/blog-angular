import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { global } from '../../services/global';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css'],
  providers: [CategoryService, PostService, UserService],
})
export class CategoryDetailComponent implements OnInit {
  public pageTitle: string;
  public category: Category;
  // aqui se podría hacer un array de posts
  public posts: any;
  public url: string;
  public status: string;
  public identity;
  public token;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private postService: PostService,
    private userService: UserService
  ) {
    this.url = global.url;
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
  }

  ngOnInit(): void {
    this.getPostsByCategory();
  }

  getPostsByCategory() {
    this.route.params.subscribe((params) => {
      let id = +params['id'];

      this.categoryService.getCategory(id).subscribe(
        (response) => {
          if (response.status === 'success') {
            // console.log(response);
            this.category = response.category;

            this.categoryService.getPosts(id).subscribe(
              (response) => {
                if (response.status === 'success') {
                  this.posts = response.posts;
                } else {
                  this.router.navigate(['/inicio']);
                }
              },
              (error) => {
                console.log(error as any);
              }
            );
          } else {
            this.router.navigate(['/inicio']);
          }
        },
        (error) => {}
      );
    });
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
        // this.getPosts();
        // hay que recargar los posts de la categoria
        this.getPostsByCategory();
      },
      (error) => {
        console.log(error as any);
      }
    );
  }
}
