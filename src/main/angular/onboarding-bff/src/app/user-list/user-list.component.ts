import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserCreateComponent } from '../user-create/user-create.component';
=======
>>>>>>> quinn

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

<<<<<<< HEAD
  constructor(private modalController: NgbModal) { }

  ngOnInit(): void {
  }
  addUser():void {
    this.modalController.open(UserCreateComponent);
  }
=======
  constructor() { }

  ngOnInit(): void {
  }
>>>>>>> quinn

}
