import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css'],
  providers: [CategoryService],
})
export class CategoryDetailComponent implements OnInit {
  public pageTitle: string;
  public category: Category;
  // aqui se podría hacer un array de posts
  public posts: any;
  public url: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService
  ) {
    this.url = global.url;
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
          } else {
            this.router.navigate(['/inicio']);
          }
        },
        (error) => {}
      );
    });
  }
}
