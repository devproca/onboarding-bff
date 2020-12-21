import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserDeleteComponent } from '../user-delete/user-delete.component';
import { UserEditComponent } from '../user-edit/user-edit.component';
=======
>>>>>>> quinn

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

<<<<<<< HEAD
  constructor(private modalController:NgbModal) { }

  ngOnInit(): void {
  }
  editUser():void{
    this.modalController.open(UserEditComponent)
  }
  deleteUser():void {
    this.modalController.open(UserDeleteComponent)
  }
=======
  constructor() { }

  ngOnInit(): void {
  }
>>>>>>> quinn

}
