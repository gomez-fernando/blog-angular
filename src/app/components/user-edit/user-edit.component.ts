import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { log } from 'util';
import { global } from '../../services/global';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService],
})
export class UserEditComponent implements OnInit {
  public pageTitle: string;
  public user: User;
  public identity;
  public token;
  public status;
  public url;
  public froalaOptions = {
    placeholderText: 'Dí algo sobre tí!',
    linkText: true,
    charCounterCount: true,
  };
  public afuConfig = {
    multiple: false,
    formatsAllowed: '.jpg,.png, .jpeg, .gif',
    maxSize: '20',
    uploadAPI: {
      url: global.url + 'user/upload',
      headers: {
        // 'Content-Type': 'text/plain;charset=UTF-8',
        Authorization: this.userService.getToken(),
      },
    },
    theme: 'attachPin',
    hideProgressBar: false,
    hideResetBtn: false,
    hideSelectBtn: false,
    attachPinText: 'Seleccionar archivo',
    replaceTexts: {
      selectFileBtn: 'Seleccionar archivo',
      resetBtn: 'Reset',
      uploadBtn: 'Subir',
      dragNDropBox: 'Suelta tu archivo aquí',
      attachPinBtn: 'Seleccionar archivos...',
      afterUploadMsg_success: 'Subido con éxito !',
      afterUploadMsg_error: 'Fallo al subir el archivo !',
    },
  };

  constructor(private userService: UserService) {
    this.pageTitle = 'Ajustes de usuario';
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '', '');
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
    this.url = global.url;
    // rellenar objeto usuario
    // this.user = this.identity;
    // this.user.id = null;

    this.user = new User(
      this.identity.sub,
      this.identity.name,
      this.identity.surname,
      this.identity.role,
      this.identity.nick,
      this.identity.email,
      '',
      this.identity.description,
      this.identity.image
    );
  }

  ngOnInit(): void {
    // console.log('este es el usuario' + JSON.stringify(this.user));
  }

  onSubmit(form) {
    this.userService.update(this.token, this.user).subscribe(
      (response) => {
        // console.log(response);
        if (response && response.status) {
          // console.log(response);
          this.status = 'success';

          // actualizar el usuario identificado
          if (response.changes.name) {
            this.user.name = response.changes.name;
          }
          if (response.changes.surname) {
            this.user.surname = response.changes.surname;
          }
          if (response.changes.nick) {
            this.user.nick = response.changes.nick;
          }
          if (response.changes.email) {
            this.user.email = response.changes.email;
          }
          if (response.changes.description) {
            this.user.description = response.changes.description;
          }
          if (response.changes.image) {
            this.user.image = response.changes.image;
          }

          this.identity = this.user;
          // modificar el localStorage
          localStorage.setItem('identity', JSON.stringify(this.identity));
        } else {
          this.status = 'error';
        }
      },
      (error) => {
        this.status = 'error';
        console.log(error as any);
      }
    );
  }

  avatarUpload(datos) {
    let data = JSON.parse(datos.response);
    this.user.image = data.image;
  }
}
