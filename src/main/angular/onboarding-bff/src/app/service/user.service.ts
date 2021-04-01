import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {UserModel} from "../model/user.model";
import {delay, map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

const BASE_URI = "./api/v1/users";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  create(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(BASE_URI, user);
  }

  update(user: UserModel): Observable<UserModel> {
    return this.http.put<UserModel>(`${BASE_URI}/${user.userId}`, user);
  }

  get(userId: string): Observable<UserModel> {
    return this.http.get<UserModel> (`${BASE_URI}/${userId}`);
  }

  findAll(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(BASE_URI);
  }
}
