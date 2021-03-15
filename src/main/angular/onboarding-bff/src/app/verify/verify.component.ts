import {Component, OnInit, OnDestroy} from '@angular/core';
import {VerifyService} from "../service/verify.service";
import {Subscription} from "rxjs";
import {PhoneNumberModel} from "../model/phoneNumber.model";
import {SmsModel} from "../model/sms.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit, OnDestroy {
  verifiedNumber: PhoneNumberModel;
  numberToVerify: string;
  startVerify = true;
  verifyCode: string;
  failed: boolean;
  subscriptions: Subscription[] = [];

  loadingSubscription = Subscription.EMPTY;

  constructor(private verifyService: VerifyService, private router: Router) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  startVerification(phoneNumber: string): void {
    let number = new SmsModel(phoneNumber);
    this.subscriptions.push(
      this.loadingSubscription = this.verifyService.startVerificationProcess(number).subscribe(_ => {
        this.startVerify = !this.startVerify, this.failed = false
      }, error => this.failed = true));
  }

  verify(phoneNumber: string, verifyCode: string): void {
    this.subscriptions.push(
      this.verifyService.verify(phoneNumber, verifyCode).subscribe(number => {
        this.verifiedNumber = number, this.router.navigateByUrl('/users')
      }, error => this.failed = true));

  }

}
