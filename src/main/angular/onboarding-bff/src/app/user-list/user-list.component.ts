import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserCreateComponent } from '../user-create/user-create.component';
import {UserService} from '../service/user.service'
import { UserModel } from '../model/user.model';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  userList : UserModel [] = [];
  activeUser: UserModel = {
    userId:'',
    username:'',
    lastName:'',
    firstName:''
  };
  userListSubscription: Subscription;

  constructor(private modalController: NgbModal,
              private userService: UserService) { }

  ngOnInit(): void {
    /*this.userService.findAll().subscribe(userList => {
      this.userList = userList;
      if(this.userList.length > 0){
        this.userService.setActiveUser(this.userList[0]);
        this.activeUser = this.userList[0];
      }
    }, err => {
      //Handel some error here
    }); */
    this.userListSubscription = this.userService.refreshUserList.subscribe((userList:UserModel[]) => {
      this.userList = userList;
    });
  }
  ngOnDestroy():void {
    if(this.userListSubscription){
      this.userListSubscription.unsubscribe();
    }
  }
  addUser():void {
    this.modalController.open(UserCreateComponent);
  }
  setActiveUser(user):void{
    this.activeUser = user;
    this.userService.setActiveUser(user);
  }

}
