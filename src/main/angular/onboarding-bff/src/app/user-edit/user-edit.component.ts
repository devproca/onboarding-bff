import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import {Subscription} from "rxjs";

import { UserModel } from "../model/user.model";
import { UserService } from "../service/user.service";


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit, OnDestroy {
  formGroup = this.createFormGroup();
  username: string;

  private subscriptions: Subscription[] = [];

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.acquireUser();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  acquireUser(): void {
    this.subscriptions.push(
      this.activatedRoute.paramMap.subscribe(p => {
          this.patchForm(p.get("userId"))
        }
      ));
  }

  patchForm(userId: string): void {
    this.subscriptions.push(
      this.userService.get(userId).subscribe(user => {
        this.formGroup.patchValue(user);
        this.username = user.username;
      })
    );
  }

  onSave(): void {
    const user = this.formGroup.value as UserModel;

    this.userService.update(user).subscribe(_ => {
      this.router.navigateByUrl("users");
    }, error => {
      const errors = error.error;
      Object.keys(errors).forEach(key => this.formGroup.get(key).setErrors({"error": errors[key]}));
    });
  }

  onCancel(): void {
    this.router.navigateByUrl("users");
  }

  get firstNameValidator(): FormControl {
    return this.formGroup.get("firstName") as FormControl;
  }

  get lastNameValidator(): FormControl {
    return this.formGroup.get("lastName") as FormControl;
  }

  private createFormGroup(): FormGroup {
    return this.formBuilder.group({
      userId: '',
      firstName: '',
      lastName: '',
      username: ''
    });
  }
}
