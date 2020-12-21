import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  @ViewChild('userForm') public userForm: NgForm;
  user;
  constructor() { }

  ngOnInit(): void {

  }
  onSubmit(): void {
    console.log(this.userForm.value);
  }

}

interface User {
  username:string;
  firstName:string;
  lastName:string;
}
