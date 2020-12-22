import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Form, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PhoneModel} from "../model/phone.model";
import {PhoneService} from "../service/phone.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-phone-detail',
  templateUrl: './phone-detail.component.html',
  styleUrls: ['./phone-detail.component.scss']
})
export class PhoneDetailComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;
  subscriptions: Subscription[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private phoneService: PhoneService) { }

  ngOnInit(): void {
    this.formGroup = this.createFormGroup();
    this.registerRouteParamChanges();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private registerRouteParamChanges(): void {
    this.subscriptions.push(
      this.route.paramMap.subscribe(params => {
        const userId = params.get("id");
        const id = params.get("phoneId");
        this.reloadPhone(userId, id);
      })
    );
  }

  private reloadPhone(userId: string, phoneId: string): void {
    if (phoneId) {
      this.phoneService.get(userId, phoneId).subscribe(phone => {
        this.formGroup.patchValue(phone);
      })
    } else {
      this.formGroup.reset();
      this.formGroup.patchValue({"userId": userId });
    }
  }


  save(): void {
    const valueToSave = this.formGroup.value as PhoneModel;
    this.phoneService.create(valueToSave).subscribe(_ => {
      this.goBack();
    }, httpError => {
      const errors = httpError.error;
      Object.keys(errors)
        .forEach(k => this.formGroup.get(k).setErrors({"error": errors[k]}));
    });
  }

  update() : void {
    const valueToSave = this.formGroup.value as PhoneModel;
    this.phoneService.update(valueToSave).subscribe(_ => {
      this.goBack();
    }, httpError => {
      const errors = httpError.error;
      Object.keys(errors)
        .forEach(k => this.formGroup.get(k).setErrors({"error": errors[k]}));
    });
  }

  isCreate(): boolean {
    return !this.formGroup.get('phoneId').value;
  }

  goBack() {
    this.router.navigateByUrl(`detail/${this.userIdControl.value}`);
  }

  get phoneNumberControl(): FormControl {
    return this.formGroup.get("phoneNumber") as FormControl;
  }

  get userIdControl(): FormControl {
    return this.formGroup.get("userId") as FormControl;
  }

  get isVerifiedControl(): FormControl {
    return this.formGroup.get("isVerified") as FormControl;
  }

  private createFormGroup(): FormGroup {
    return this.formBuilder.group({
      userId: '',
      phoneId: '',
      phoneNumber: '',
      isVerified: ''
    })
  }

}
