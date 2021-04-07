import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";

import { UserModel } from "../model/user.model";
import { UserService } from "../service/user.service";


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  formGroup = this.createFormGroup();

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.formGroup = this.createFormGroup();
  }

  createUser(): void {
    const user = this.formGroup.value as UserModel;
    this.userService.create(user).subscribe(_ => {
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

  get usernameValidator(): FormControl {
    return this.formGroup.get("username") as FormControl;
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
