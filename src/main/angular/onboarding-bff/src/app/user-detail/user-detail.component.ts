import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
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
  editUser():void{
    this.modalController.open(UserEditComponent)
  }
  deleteUser():void {
    this.modalController.open(UserDeleteComponent)
  }

}
