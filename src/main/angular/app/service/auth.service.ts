import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {UserModel} from "../model/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _currentUser$ = new BehaviorSubject<UserModel | null>(null);
  currentUser$ = this._currentUser$.asObservable();

  constructor() {
  }

  login(username: string, password: string): void {
    this._currentUser$.next({firstName: 'Tim'} as UserModel);
  }

  logout(): void {
    this._currentUser$.next(null);
  }
}
