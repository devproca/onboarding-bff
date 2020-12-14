import { Component, OnInit } from '@angular/core';
import {UserModel} from "../model/user.model";
import {UserService} from "../service/user.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: UserModel[] = [];
  loadingSubscription = Subscription.EMPTY;
  myVariable=" hello angular variable";
  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.loadingSubscription = this.userService.findAll().subscribe(users => {
      this.users = users;
    })
  }

  delete(user): void{
    this.userService.delete(user.userId).subscribe(users => {
      this.users = this.users.filter(u => u != user);
    })
  }

}
