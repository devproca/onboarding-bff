import {Component, OnInit} from '@angular/core';
import {UserModel} from "../model/user.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.formGroup = this.createFormGroup();

    // const user = {
    //   firstName: "jess"
    // }
    //
    // setTimeout(() => {
    //   this.formGroup.patchValue(user);
    // }, 2000)

  }

  save() {
    const valueToSave = this.formGroup.value as UserModel;
    this.userService.create(valueToSave).subscribe(savedUser => {
      console.log("it worked!");
    });
  }

  isCreate() {
   return !this.formGroup.get("userId");
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
