import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  @ViewChild('userForm') public userForm: NgForm;
  constructor(private userService: UserService) { }

  ngOnInit(): void {

  }
  onSubmit(): void {
    if(this.userForm.valid){
      this.userService.create(this.userForm.value).subscribe(user => {

      }, err => {
        // show what is broken
      });
    }
    console.log(this.userForm.value);
  }

}

