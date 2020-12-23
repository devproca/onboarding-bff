import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
})
export class UserCreateComponent implements OnInit {
  @ViewChild('userForm') public userForm: NgForm;
  phoneNumberBool:boolean;
  constructor(
    private userService: UserService,
    private modeController: NgbActiveModal
  ) {}

  ngOnInit(): void {}
  onSubmit(): void {
   /* if (this.userForm.valid) {
      this.userService.create(this.userForm.value).subscribe(
        (user) => {
          this.modeController.close();
        },
        (err) => {
          // show what is broken
        }
      );
    } */
    console.log(this.userForm.value);
  }
  closeModal(): void {
    this.modeController.close();
  }
  public onPhoneNumberCheckChanged(value:boolean){
    console.log(value);
    this.phoneNumberBool = value;
}
  
}
