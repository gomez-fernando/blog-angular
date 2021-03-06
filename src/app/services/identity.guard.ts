import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class IdentityGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}

  canActivate() {
    let identity = this.userService.getIdentity();

    if (identity) {
      return true;
    } else {
      this.router.navigate(['/error']);
      return false;
    }
  }
}
