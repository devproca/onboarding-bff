import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserModel} from "../model/user.model";
import {UserService} from "../service/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnDestroy {

  formGroup = this.createFormGroup();
  subscriptions: Subscription[] = [];

  constructor(private userService: UserService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.subscribeToNoMiddleNameChanges();
    this.subscribeToRouteParamChanges();

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  save(): void {
    const valueToSave = this.formGroup.value as UserModel;
    this.userService.create(valueToSave).subscribe(_ => this.router.navigateByUrl("/users"),
      httpError => {
        console.log("oh no!", httpError)
      })
  }

  private createFormGroup(): FormGroup {
    return this.formBuilder.group({
      userId: null,
      firstName: null,
      middleName: null,
      lastName: null,
      noMiddleName: false,
      emailAddress: null,
      password: null,
    });
  }

  private subscribeToRouteParamChanges(): void {
    this.subscriptions.push(
      this.activatedRoute.paramMap.subscribe(params => {
        const userId = params.get("userId");
        if (userId) {
          this.refreshUser(userId);
        } else {
          this.formGroup.reset();
        }
      }));
  }

  private subscribeToNoMiddleNameChanges(): void {
    this.subscriptions.push(
      this.formGroup.controls.noMiddleName.valueChanges.subscribe(value => {
        if (value) {
          this.formGroup.controls.middleName.reset();
          this.formGroup.controls.middleName.disable();
        } else {
          this.formGroup.controls.middleName.enable();
        }
      }));
  }

  private refreshUser(userId: string) {
    this.userService.get(userId).subscribe(user => this.formGroup.patchValue(user));
  }
}
