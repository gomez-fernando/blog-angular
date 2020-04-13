import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';
import { provideRoutes } from '@angular/router';
import { global } from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // cargar UserService en providers
  providers: [UserService],
})
export class AppComponent implements OnInit, DoCheck {
  public title = 'Blog Angular';
  public identity;
  public token;
  public url;

  constructor(public userService: UserService) {
    this.loadUser();
    this.url = global.url;
  }

  loadUser() {
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
  }

  ngOnInit() {
    console.log('Web app cargada correctamente :)');
  }

  ngDoCheck() {
    this.loadUser();
  }
}
