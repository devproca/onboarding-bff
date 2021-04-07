import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { Subscription} from "rxjs";

import { PhoneService } from "../service/phone.service";
import { PhoneNumberModel } from "../model/phone-number.model";


@Component({
  selector: 'app-phone-detail',
  templateUrl: './phone-detail.component.html',
  styleUrls: ['./phone-detail.component.scss']
})
export class PhoneDetailComponent implements OnInit, OnDestroy {
  @Input() userId;

  formGroup = this.createFormGroup();

  private subscriptions: Subscription[] = [];

  constructor(private formBuilder: FormBuilder,
              private phoneService: PhoneService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.patchForm(this.userId, null);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  patchForm(userId: string, phoneId: string): void {
    if (phoneId) {
      this.phoneService.get(userId, phoneId).subscribe(phone => {
        this.formGroup.patchValue(phone);
      })
    } else {
      this.formGroup.reset();
      this.formGroup.patchValue({"userId": userId});
    }
  }

  createNumber(): void {
    const phoneNumber = this.formGroup.value as PhoneNumberModel;

    this.phoneService.create(phoneNumber).subscribe(_ => {
      },
      error => {
        const errors = error.error;
        Object.keys(errors).forEach(key => this.formGroup.get(key).setErrors({"error": errors[key]}));
      });
  }

  get phoneValidator(): FormControl {
    return this.formGroup.get("phoneNumber") as FormControl;
  }

  private createFormGroup(): FormGroup {
    return this.formBuilder.group({
      phoneId: '',
      userId: '',
      phoneNumber: '',
      isVerified: ''
    });
  }
}
