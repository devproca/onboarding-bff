import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";

import { Subscription } from "rxjs";

import { UserModel } from "../model/user.model";
import { UserService } from "../service/user.service";
import { DialogService } from "../angular-components/dialog/dialog.service";
import { PhoneListComponent } from "../phone-list/phone-list.component";
import { PopperComponent } from "../angular-components/popper/popper.component";


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  loadingSubscription = Subscription.EMPTY;
  users: UserModel[] = [];

  @ViewChild('refDelete') private deletePopper: PopperComponent;

  constructor(private userService: UserService,
              private router: Router,
              private dialogService: DialogService) {
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
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

  openPhoneDialog(user: UserModel): void {
    this.dialogService.open(PhoneListComponent, {
      data: { user: user },
      size: 'lg'
    });
  }
}
