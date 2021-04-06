import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";

import {UserService} from "../service/user.service";
import {UserModel} from "../model/user.model";
import {Subscription} from "rxjs";
import {PhoneNumberModel} from "../model/phone-number.model";
import {PopperComponent} from "../angular-components/popper/popper.component";


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @ViewChild(PopperComponent) private popper: PopperComponent;

  loadingSubscription = Subscription.EMPTY;

  users: UserModel[] = [];
  phoneNumbers: PhoneNumberModel[] = [];

  constructor(private userService: UserService,
              private router: Router) {
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
    this.popper.hide();
  }
}
