import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserService} from "../service/user.service";
import {UserModel} from "../model/user.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  formGroup = this.createFormGroup();

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
  }

  createUser(): void {
    const user = this.formGroup.value as UserModel;
    this.userService.create(user).subscribe(_ => {
      this.router.navigateByUrl("users");
    }, error => {
      //this is where you would handle a 400 like a validation error
    });
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
