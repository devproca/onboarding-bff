import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {SmsModel} from "../model/sms.model";
import {PhoneNumberModel} from "../model/phoneNumber.model";

const START_URI = "./api/start-verify"
const FINISH_URI = "./api/verify"

@Injectable({
  providedIn: 'root'
})
export class VerifyService {

  constructor(private http: HttpClient) {
  }

  startVerificationProcess(phoneNumber: SmsModel): Observable<SmsModel> {
    return this.http.post<SmsModel>(START_URI, phoneNumber);
  }

  verify(phoneNumber: string, verifyCode: string): Observable<PhoneNumberModel> {
    let smsObject = new SmsModel(phoneNumber);
    smsObject.verifyCode = verifyCode;
    return this.http.post<PhoneNumberModel>(FINISH_URI, smsObject);
  }
}
