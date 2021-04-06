import {Component, Input, OnInit} from '@angular/core';
import {PhoneNumberModel} from "../model/phone-number.model";
import {PhoneService} from "../service/phone.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {VerificationModel} from "../model/verification.model";


@Component({
  selector: 'app-verify-number',
  templateUrl: './verify-number.component.html',
  styleUrls: ['./verify-number.component.scss']
})
export class VerifyNumberComponent implements OnInit {
  @Input() phoneNumber: PhoneNumberModel;

  applyCode = false;
  formGroup: FormGroup;

  constructor(private phoneService: PhoneService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.createFormGroup();
  }

  initiateVerification(): void {
    this.applyCode = true;
    this.phoneService.sendVerifyCode(this.phoneNumber).subscribe();
  }

  verify(): void {
    const dto = this.formGroup.value as VerificationModel;
    const userId = this.phoneNumber.userId;
    const phoneId = this.phoneNumber.phoneId;

    this.phoneService.verifyCode(dto, userId, phoneId).subscribe();
  }

  private createFormGroup(): FormGroup {
    return this.formBuilder.group({
      verifyCode: ''
    });
  }
}
