import { Component, OnInit } from '@angular/core';
import {UserModel} from "../model/user.model";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  selectedUser: UserModel | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  onSelectUser(user: UserModel | null) {
    this.selectedUser = user;
  }
}
