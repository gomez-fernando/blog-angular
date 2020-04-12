import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { isGeneratedFile } from '@angular/compiler/src/aot/util';
// import { Observable } from 'rxjs';

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
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.pageTitle = 'Identifícate';
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '', '');
  }

  ngOnInit(): void {
    // Se ejecuta siempre y cierra sesión solo cuando le llega el parámetro sure por la url
    this.logout();
  }

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

              // redireccion a inicio
              this.router.navigate(['inicio']);
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

  logout() {
    this.route.params.subscribe((params) => {
      // con + lo casteamos a un entero
      let logout = +params['sure'];

      if (logout === 1) {
        localStorage.removeItem('identity');
        localStorage.removeItem('token');

        this.identity = null;
        this.token = null;

        // redireccion a inicio
        this.router.navigate(['inicio']);
      }
    });
  }
}
