import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {UserModel} from "../model/user.model";
import {UserService} from "../service/user.service";
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnDestroy, OnChanges {

  @Input() selectedUser: UserModel | null = null;

  formGroup = this.createFormGroup();
  subscriptions: Subscription[] = [];

  constructor(private userService: UserService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.subscribeToNoMiddleNameChanges();
  }

  ngOnChanges(): void {
    if (this.selectedUser) {
      this.formGroup.patchValue(this.selectedUser);
    } else {
      this.formGroup.reset();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  save(): void {
    const valueToSave = this.formGroup.value as UserModel;
    this.userService.create(valueToSave);
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
}
