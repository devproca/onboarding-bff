import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {PhoneService} from "../service/phone.service";
import {PhoneModel} from "../model/phone.model";
import {VerificationCodeModel} from "../model/verification-code.model";
import {Location} from "@angular/common";

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {

  @Input()
  userId: string;

  formGroup: FormGroup;

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private phoneService: PhoneService,
              private location: Location) { }

  ngOnInit(): void {
    this.formGroup = this.createFormGroup();
    const phoneId = this.route.snapshot.paramMap.get('phoneId');
    this.formGroup.patchValue({'phoneId': phoneId});
  }

  verify(): void {
    const valueToSave = this.formGroup.value as VerificationCodeModel;
    this.phoneService.verify(this.userId, valueToSave).subscribe(verifiedSuccess => {
      this.goBack();
    })
  }

  goBack(): void {
    this.location.back();
  }

  private createFormGroup(): FormGroup {
    return this.formBuilder.group({
      phoneId: '',
      code: ''
    })
  }
}
