import {Component, OnInit} from '@angular/core';
import {UserModel} from "../model/user.model";
import {UserService} from "../service/user.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: UserModel[] = [];
  loadingSubscription = Subscription.EMPTY;

  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadingSubscription = this.userService.findAllUsers().subscribe(users => this.users = users);
  }

  edit(user: UserModel): void {
    this.router.navigateByUrl(`/users/${user.userId}`);
  }

  delete(user: UserModel): void {
    this.router.navigateByUrl(`/users/${user.userId}`);
  }


  create(): void {
    this.router.navigateByUrl("/users/create");
  }
}
