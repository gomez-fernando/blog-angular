import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';
import { CategoryService } from './services/category.service';
import { provideRoutes } from '@angular/router';
import { global } from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // cargar UserService en providers
  providers: [UserService, CategoryService],
})
export class AppComponent implements OnInit, DoCheck {
  public title = 'Blog Angular';
  public identity;
  public token;
  public url;
  public categories;
  public status: string;

  constructor(
    public userService: UserService,
    public categoryService: CategoryService
  ) {
    this.loadUser();
    this.url = global.url;
  }

  loadUser() {
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
  }

  ngOnInit() {
    // console.log('Web app cargada correctamente :)');
    this.getCategories();
  }

  ngDoCheck() {
    this.loadUser();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(
      (response) => {
        if (response.status === 'success') {
          this.categories = response.categories;

          // console.log('se han conseguido las categorias');
          // console.log(this.categories);
        }
      },
      (error) => {
        this.status = 'error';
        console.log(
          'estamos aquí, error desde la peticiond e categorias en app.component'
        );
        console.log(error as any);
      }
    );
  }
}
