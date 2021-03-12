import {Component, OnInit} from '@angular/core';
import {UserModel} from "../model/user.model";
import {PhoneNumberModel} from "../model/phoneNumber.model";
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
  phoneNumbers: PhoneNumberModel[] = []
  loadingSubscription = Subscription.EMPTY;
  showDeletePopUp = false;
  userId: string

  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.loadingSubscription = this.userService.findAllUsers().subscribe(users => this.users = users);
  }

  edit(user: UserModel): void {
    this.router.navigateByUrl(`/users/${user.userId}`);
  }

  create(): void {
    this.router.navigateByUrl("/users/create");
  }

  delete(userId: string): void {
    this.showDeletePopUp = !this.showDeletePopUp;
    this.userId = userId
  }

  confirmDelete(): void {
    this.userService.delete(this.userId).subscribe(() => this.fetchUsers());
    this.closePopUp();
  }

  closePopUp(): void {
    this.userId = "";
    this.showDeletePopUp = !this.showDeletePopUp;
  }

}
