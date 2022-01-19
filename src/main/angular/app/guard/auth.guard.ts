import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../service/auth.service";
import {take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private _redirectTo: string | null = null;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  get redirectTo(): string | null {
    return this._redirectTo;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return new Promise((resolve) => {
      this.authService.currentUser$.pipe(
        take(1)
      ).subscribe(currentUser => {
        if (!currentUser) {
          this._redirectTo = state.url;
          this.router.navigateByUrl("login");
        } else {
          resolve(true);
        }
      });
    });
  }

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //
  //   return this.authService.currentUser$.pipe(
  //     take(1),
  //     tap(user => {
  //       if(!user) {
  //         this.router.navigateByUrl("login");
  //       }
  //     }),
  //     map(_ => true)
  //   );
  // }

}
