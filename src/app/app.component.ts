import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { provideRoutes } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // cargar UserService en providers
  providers: [UserService],
})
export class AppComponent {
  public title = 'Blog Angular';
  public identity;
  public token;

  constructor(public userService: UserService) {
    this.identity = this.userService.getIdentity();
  }
}
