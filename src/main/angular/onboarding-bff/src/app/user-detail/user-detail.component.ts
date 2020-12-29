import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AddPhoneNumberToUserComponent } from '../add-phone-number-to-user/add-phone-number-to-user.component';
import { UserModel } from '../model/user.model';
import { UserService } from '../service/user.service';
import { UserDeleteComponent } from '../user-delete/user-delete.component';
import { UserEditComponent } from '../user-edit/user-edit.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnDestroy {
  activeUser: UserModel = {
    userId:'',
    username:'',
    lastName:'',
    firstName:'',
    phoneNumbers: []
  };
  activeUserSubscription: Subscription;
  constructor(private modalController:NgbModal,
              private userService:UserService) { }

  ngOnInit(): void {
    this.activeUserSubscription = this.userService.activeUser.subscribe(
      (user) => {
        this.activeUser = user;
      }
    );
  }
  ngOnDestroy(): void {
    if (this.activeUserSubscription) {
      this.activeUserSubscription.unsubscribe();
    }
  }
  addPhonenumber():void {
    this.modalController.open(AddPhoneNumberToUserComponent)
  }
  editUser():void{
    this.modalController.open(UserEditComponent)
  }
  deleteUser():void {
    this.modalController.open(UserDeleteComponent)
  }
  deletePhonenumber(phoneId):void {
    this.activeUser.phoneNumbers =this.activeUser.phoneNumbers.filter(number => number.phoneNumberId !== phoneId );
    this.userService.update(this.activeUser).subscribe();
  }

}
