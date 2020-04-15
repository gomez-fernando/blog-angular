import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';

@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.css'],
  providers: [UserService, CategoryService],
})
export class CategoryNewComponent implements OnInit {
  public pageTitle: string;
  public category: Category;
  public status: string;
  public token;
  public identity;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private categoryService: CategoryService
  ) {
    this.pageTitle = 'Crear categoría';
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
    this.category = new Category(1, '');
  }

  ngOnInit(): void {}

  onSubmit(form) {
    // console.log(this.category);
    this.categoryService.create(this.token, this.category).subscribe(
      (response) => {
        if (response.status === 'success') {
          this.category = response.category;
          this.status = 'success';

          // redirigimos a inicio
          this.router.navigate(['/inicio']);
        } else {
          this.status = 'error';
        }
      },
      (error) => {
        this.status = 'error';
        console.log('estamos aquí en el error desde category-new.component.ts');
        console.log(error as any);
      }
    );
  }
}
