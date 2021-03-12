import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {UserModel} from "../model/user.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.prod";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUri = environment.baseUri;

  constructor(private http: HttpClient) {

  }

  findAllUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.baseUri);
  }

  get(userId: string): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.baseUri}/${userId}`);
  }

  delete(userId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUri}/${userId}`);
  }

  create(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(this.baseUri, user);
  }

  update(user: UserModel): Observable<UserModel> {
    return this.http.put<UserModel>(`${this.baseUri}/${user.userId}`, user);
  }
}
