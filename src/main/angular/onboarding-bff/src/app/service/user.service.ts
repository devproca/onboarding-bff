import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import { map } from 'rxjs/operators';
import {UserModel} from "../model/user.model";
import {HttpClient} from "@angular/common/http";

const BASE_URI = './api/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userList: UserModel [] = [];
  activeUser: BehaviorSubject<UserModel> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(BASE_URI).pipe(map((users:UserModel []) => {
      this.userList = users;
      return users;
    }
    ));
  }

  create(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(BASE_URI, user);
  }

  update(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${BASE_URI}/${user.userId}`, user);
  }
}
