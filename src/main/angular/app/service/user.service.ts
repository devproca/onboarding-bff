import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {UserModel} from "../model/user.model";
import {HttpClient} from "@angular/common/http";

const BASE_URI = './api/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _users$ = new BehaviorSubject<UserModel[]>([]);
  users$ = this._users$.asObservable();

  constructor(private httpClient: HttpClient) {
  }

  load(): void {
    this.httpClient.get<UserModel[]>(BASE_URI).subscribe(users => this._users$.next(users));
  }

  create(user: UserModel): void {
    this.httpClient.post<UserModel>(BASE_URI, user).subscribe(_ => this.load());
  }
}
