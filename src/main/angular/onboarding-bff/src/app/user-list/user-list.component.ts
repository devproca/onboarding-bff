import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserModel} from "../model/user.model";
import {UserService} from "../service/user.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  users: UserModel[] = [];
  subscriptions: Subscription[] = [];

  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.refreshData();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  private refreshData() {
     const subscription =
      this.userService.findAllUsers().subscribe(
        users => this.users = users);
     this.subscriptions.push(subscription);
  }

  edit(user: UserModel): void {
    this.router.navigate( ['/users', 'edit', `${user.userId}`] );
  }

  delete(user: UserModel): void {
    if (window.confirm(`Please confirm you wish to delete USER: ${user.username}`)) {
      const subscription = this.userService.delete(user.userId).subscribe(
        _ => this.refreshData());
        this.subscriptions.push(subscription);
    }
  }

}
