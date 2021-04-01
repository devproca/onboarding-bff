import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {Observable} from "rxjs";

import {PhoneNumberModel} from "../model/phone-number.model";


const BASE_URI = "./api/v1/users";

@Injectable({
  providedIn: 'root'
})
export class PhoneService {

  constructor(private http: HttpClient) { }

  create(phone: PhoneNumberModel): Observable<PhoneNumberModel> {
    return this.http.post<PhoneNumberModel>(`${BASE_URI}/${phone.userId}/phonenumbers`, phone);
  }

  // update(user: UserModel): Observable<UserModel> {
  //   return this.http.put<UserModel>(`${BASE_URI}/${user.userId}`, user);
  // }
  //
  get(userId: string, phoneId: string): Observable<PhoneNumberModel> {
    return this.http.get<PhoneNumberModel> (`${BASE_URI}/${userId}/phonenumbers/${phoneId}`);
  }
  //
  // findAll(): Observable<UserModel[]> {
  //   return this.http.get<UserModel[]>(BASE_URI);
  // }
  //
  // delete(userId: string): Observable<UserModel> {
  //   return this.http.delete<UserModel>(`${BASE_URI}/${userId}`);
  // }
}
