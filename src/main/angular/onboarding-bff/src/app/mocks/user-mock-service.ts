import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {UserModel} from "../model/user.model";


@Injectable({
  providedIn: 'root'
})
export class UserMockService {

  constructor() {}

  findAllUsers(): Observable<UserModel[]> {
    return of( [new UserModel(), new UserModel()]);
  }

  get(userId: string): Observable<UserModel> {
    return of(new UserModel());
  }

  delete(userId: string): Observable<any> {
    return of(null);
  }

  create(user: UserModel): Observable<UserModel> {
    return of(new UserModel());
  }

  update(user: UserModel): Observable<UserModel> {
    return of(new UserModel());
  }
}
