import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {UserModel} from "../model/user.model";
import {HttpClient} from "@angular/common/http";

const BASE_URI = "./api/users"

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {

  }

  findAllUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(BASE_URI);
  }

  get(userId: string): Observable<UserModel> {
    return this.http.get<UserModel>(`${BASE_URI}/${userId}`);
  }

  create(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(BASE_URI, user);
  }

  update(user: UserModel): Observable<UserModel> {
    return this.http.put<UserModel>(`${BASE_URI}/${user.userId}`, user);
  }

  delete(userId: string): Observable<UserModel> {
    return this.http.delete<UserModel>(`${BASE_URI}/${userId}`);
  }

  deletePhoneNumber(userId: string, phoneId:string): Observable<UserModel>{
    return this.http.delete<UserModel>(`${BASE_URI}/${userId}/phonenumbers/${phoneId}`)
  }
}
