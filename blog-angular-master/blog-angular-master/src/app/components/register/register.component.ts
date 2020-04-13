import { Component, OnInit } from '@angular/core';
// importar el modelo de usuario
import { User } from '../../models/user';
// importar el servicio de usuario
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService],
})
export class RegisterComponent implements OnInit {
  public pageTitle: string;
  public user: User;
  public status: string;

  constructor(private userService: UserService) {
    this.pageTitle = 'Regístrate';
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '', '');
  }

  ngOnInit(): void {
    console.log('Componente register cargado');
    console.log(this.userService.test());
  }

  onSubmit(form) {
    // console.log(this.user);
    this.userService.register(this.user).subscribe(
      (response) => {
        if (response.status === 'success') {
          console.log(response);
          this.status = response.status;
          form.reset();
        } else {
          console.log(response);
          this.status = 'error';
        }
      },
      (error) => {
        this.status = 'error';
        console.log(error as any);
      }
    );
  }
}
