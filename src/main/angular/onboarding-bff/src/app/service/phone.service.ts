import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PhoneModel} from "../model/phone.model";
import {VerificationCodeModel} from "../model/verification-code.model";

const BASE_URI = "./api/v1/users";
@Injectable({
  providedIn: 'root'
})
export class PhoneService {

  constructor(private http: HttpClient) {
  }

  findAll(userId): Observable<PhoneModel[]> {
    return this.http.get<PhoneModel[]>(`${BASE_URI}/${userId}/phone_numbers`);
  }

  get(userId, phoneId): Observable<PhoneModel> {
    return this.http.get<PhoneModel>(`${BASE_URI}/${userId}/phone_numbers/${phoneId}`);
  }

  create(phone: PhoneModel): Observable<PhoneModel> {
    return this.http.post<PhoneModel>(`${BASE_URI}/${phone.userId}/phone_numbers`, phone);
  }

  update(phone: PhoneModel): Observable<PhoneModel> {
    return this.http.put<PhoneModel>(`${BASE_URI}/${phone.userId}/phone_numbers/${phone.phoneId}`, phone);
  }

  delete(userId, phoneId): Observable<PhoneModel> {
    return this.http.delete<PhoneModel>(`${BASE_URI}/${userId}/phone_numbers/${phoneId}`);
  }

  verify(userId, verificationCode): Observable<VerificationCodeModel> {
    return this.http.post<VerificationCodeModel>(
      `${BASE_URI}/${userId}/phone_numbers/${verificationCode.phoneId}/verify`,
      verificationCode);
  }
}
