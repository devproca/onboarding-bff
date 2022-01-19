import {Component, OnInit, EventEmitter, Output} from '@angular/core';
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
  @Output() selectUser = new EventEmitter<UserModel | null>();

  constructor(private router: Router,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.load();
    this.subscribeToUserChanges();
  }

  createUser(): void {
    this.selectUser.emit(null);
  }

  editUser(user: UserModel): void {
    this.selectUser.emit(user);
  }

  private subscribeToUserChanges(): void {
    this.userService.users$.subscribe(users => this.users = users);
  }
}
