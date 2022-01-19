import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserModel} from "../model/user.model";
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: UserModel[] = [];

  constructor(private router: Router,
              private userService: UserService) { }

  ngOnInit(): void {
    this.refreshUsers();
  }

  createUser(): void {
    this.router.navigateByUrl("/users/create");
  }

  editUser(user: UserModel): void {
    this.router.navigateByUrl(`/users/${user.userId}`);
  }

  private refreshUsers(): void {
    this.userService.find().subscribe(users => this.users = users);
  }
}
