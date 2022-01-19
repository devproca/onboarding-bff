import {Component} from '@angular/core';
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";
import {AuthGuard} from "../guard/auth.guard";
import {materialize} from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authService: AuthService,
              private authGuard: AuthGuard,
              private router: Router) {
  }

  login(): void {
    this.authService.login("asdfs", "asdf");
    const url = this.authGuard.redirectTo ?? "users";
    this.router.navigateByUrl(url);
  }
}
