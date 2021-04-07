import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";

import { PhoneNumberModel}  from "../model/phone-number.model";
import { VerificationModel } from "../model/verification.model";


const BASE_URI = "./api/v1/users";

@Injectable({ providedIn: 'root' })
export class PhoneService {

  constructor(private http: HttpClient) { }

  create(phone: PhoneNumberModel): Observable<PhoneNumberModel> {
    return this.http.post<PhoneNumberModel>(`${BASE_URI}/${phone.userId}/phonenumbers`, phone);
  }

  get(userId: string, phoneId: string): Observable<PhoneNumberModel> {
    return this.http.get<PhoneNumberModel> (`${BASE_URI}/${userId}/phonenumbers/${phoneId}`);
  }

  findAll(userId: string): Observable<PhoneNumberModel[]> {
    return this.http.get<PhoneNumberModel[]>(`${BASE_URI}/${userId}/phonenumbers`);
  }

  delete(userId: string, phoneId: string): Observable<PhoneNumberModel> {
    return this.http.delete<PhoneNumberModel>(`${BASE_URI}/${userId}/phonenumbers/${phoneId}`);
  }

  sendVerifyCode(phone: PhoneNumberModel): Observable<VerificationModel> {
    const userId = phone.userId;
    const phoneId = phone.phoneId;

    return this.http.post<VerificationModel>(`${BASE_URI}/${userId}/phonenumbers/${phoneId}/initiateVerification`, phone);
  }

  verifyCode(verifyDto: VerificationModel, userId: string, phoneId: string): Observable<VerificationModel> {
    return this.http.post<VerificationModel>(`${BASE_URI}/${userId}/phonenumbers/${phoneId}/verify`, verifyDto);
  }
}
