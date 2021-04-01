import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

import {UserService} from "../service/user.service";
import {UserModel} from "../model/user.model";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: UserModel[] = [];
  loadingSubscription = Subscription.EMPTY;

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
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
}
