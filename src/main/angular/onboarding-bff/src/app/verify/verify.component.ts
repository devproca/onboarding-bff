import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {PhoneService} from "../service/phone.service";
import {VerificationCodeModel} from "../model/verification-code.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit, OnDestroy {

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

  ngOnDestroy() : void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private registerRouteParamChanges() : void {
    this.subscriptions.push(
      this.route.paramMap.subscribe(params => {
        const userId = params.get("id");
        const phoneId = params.get("phoneId");
        this.reloadVerification(userId, phoneId);
      })
    );
  }

  private reloadVerification(userId, phoneId) {
    this.formGroup.patchValue({'userId': userId});
    if (phoneId) {
      this.formGroup.patchValue({'phoneId': phoneId});
    } else {
      this.formGroup.reset();
    }
  }

  verify(): void {
    const valueToSave = this.formGroup.value as VerificationCodeModel;
    this.phoneService.verify(valueToSave).subscribe(_ => {
      this.goBack();
    }, httpError => {
      const errors = httpError.error;
      Object.keys(errors)
        .forEach(k => this.formGroup.get(k).setErrors({"error": errors[k]}));
    })
  }

  goBack(): void {
    this.router.navigateByUrl(`detail/${this.userIdControl.value}`);
  }

  get codeControl() : FormControl {
    return this.formGroup.get('code') as FormControl;
  }

  get userIdControl() : FormControl {
    return this.formGroup.get('userId') as FormControl;
  }

  private createFormGroup(): FormGroup {
    return this.formBuilder.group({
      phoneId: '',
      code: '',
      userId: ''
    })
  }
}
