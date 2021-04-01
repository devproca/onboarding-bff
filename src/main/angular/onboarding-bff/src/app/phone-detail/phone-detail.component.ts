import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

import {PhoneService} from "../service/phone.service";
import {UserModel} from "../model/user.model";
import {PhoneNumberModel} from "../model/phone-number.model";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-phone-detail',
  templateUrl: './phone-detail.component.html',
  styleUrls: ['./phone-detail.component.scss']
})
export class PhoneDetailComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  formGroup = this.createFormGroup();

  constructor(private formBuilder: FormBuilder,
              private phoneService: PhoneService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.acquireUser();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  acquireUser(): void {
    this.subscriptions.push(
      this.activatedRoute.paramMap.subscribe(p => {
        const userId = p.get("userId");
        const phoneId = p.get("phoneId");

        this.patchForm(userId, phoneId)
        }
      ));
  }

  patchForm(userId: string, phoneId: string): void {
    if (phoneId) {
      this.phoneService.get(userId, phoneId).subscribe(phone => {
        this.formGroup.patchValue(phone);
      })
    } else {
      this.formGroup.reset();
      this.formGroup.patchValue({"userId": userId });
    }
  }

  createNumber(): void {
    const phoneNumber = this.formGroup.value as PhoneNumberModel;

    this.phoneService.create(phoneNumber).subscribe(_ => {
      this.router.navigateByUrl("users/" + phoneNumber.userId);
    }, error => {
      //this is where you would handle a 400 like a validation error
    });
  }

  private createFormGroup(): FormGroup {
    return this.formBuilder.group({
      phoneId: '',
      userId: '',
      phoneNumber: '',
      verified: ''
    });
  }
}
