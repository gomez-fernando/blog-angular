import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  // cargar el UserService en providers
  providers: [UserService],
})
export class LoginComponent implements OnInit {
  public pageTitle: string;
  public user: User;
  public status: string;
  public token;
  public identity;

  constructor(
    // crear la propiedad userService
    private userService: UserService
  ) {
    this.pageTitle = 'Identifícate';
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '', '');
  }

  ngOnInit(): void {}

  onSubmit(form) {
    // console.log(this.user);
    this.userService.signIn(this.user).subscribe(
      (response) => {
        // devuelve el token
        if (response.status !== 'error') {
          this.status = 'success';
          this.token = response;

          // devuelve el usuario identificado repitiendo la misma llamada y añadiendo true
          this.userService.signIn(this.user, true).subscribe(
            (response) => {
              // devuelve el usuario identificado
              this.identity = response;

              // persistir en el local storage
              // console.log(this.token);
              // console.log(this.identity);
              localStorage.setItem('token', this.token);
              localStorage.setItem('identity', JSON.stringify(this.identity));
            },
            (error) => {
              this.status = error;
              console.log(error as any);
            }
          );
        } else {
        }
      },
      (error) => {
        this.status = error;
        console.log(error as any);
      }
    );
  }
}
