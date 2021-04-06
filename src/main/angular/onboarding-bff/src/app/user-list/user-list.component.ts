import {Component, OnDestroy, OnInit, ViewChild, ViewRef} from '@angular/core';
import {Router} from "@angular/router";

import {UserService} from "../service/user.service";
import {UserModel} from "../model/user.model";
import {Subscription} from "rxjs";
import {PopperComponent} from "../angular-components/popper/popper.component";
import {DialogService} from "../angular-components/dialog/dialog.service";
import {PhoneListComponent} from "../phone-list/phone-list.component";
import {DialogConfig} from "../angular-components/dialog/dialog-config.model";


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @ViewChild('refDelete') private deletePopper: PopperComponent;

  loadingSubscription = Subscription.EMPTY;

  users: UserModel[] = [];

  constructor(private userService: UserService,
              private router: Router,
              private dialogService: DialogService) {
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loadingSubscription = this.userService.findAll().subscribe(users => {
      this.users = users;
    })
  }

  createUser(): void {
    this.router.navigateByUrl("/users/create");
  }

  editUser(user: UserModel): void {
    this.router.navigateByUrl("users/" + user.userId);
  }

  deleteUser(user: UserModel): void {
    this.userService.delete(user.userId).subscribe(() => this.loadUsers());
  }

  handleCancelDelete() {
    this.deletePopper.hide();
  }

  openDialog(user: UserModel): void {
    this.dialogService.open(PhoneListComponent, {
      data: {
        userId: user.userId,
        user: user
      },
      size: 'sm'
    } as DialogConfig).onClosed(result => {
      console.log('Closed with result', result);
      });
  }
}
