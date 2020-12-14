import {Component, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import {UserModel} from "../model/user.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserService} from "../service/user.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private location: Location) {
  }

  ngOnInit(): void {
    this.formGroup = this.createFormGroup();
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.userService.get(id).subscribe(user => {
        this.formGroup.patchValue(user);
      })
    }
  }

  save() {
    const valueToSave = this.formGroup.value as UserModel;
    this.userService.create(valueToSave).subscribe(savedUser => {
      console.log("it worked!");
    });
  }

  update() {
    const valueToSave = this.formGroup.value as UserModel;
    this.userService.update(valueToSave).subscribe(savedUser => {
      this.goBack();
    });
  }

  userId() {
    return this.formGroup.get("userId").value;
  }

  isCreate() {
   return !this.userId();
  }

  goBack() {
    this.location.back();
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
