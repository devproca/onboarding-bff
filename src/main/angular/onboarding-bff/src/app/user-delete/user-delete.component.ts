import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { UserModel } from '../model/user.model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.scss'],
})
export class UserDeleteComponent implements OnInit {
  activeUser: UserModel;
  activeUserSubscription: Subscription;
  constructor(
    private userService: UserService,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.activeUserSubscription = this.userService.activeUser.subscribe(
      (user) => {
        this.activeUser = user;
      }
    );
  }
  ngOnDestroy(): void {
    if (this.activeUserSubscription) {
      this.activeUserSubscription.unsubscribe();
    }
  }
  deleteUser() {
    this.userService.delete(this.activeUser).subscribe(
      (result) => {
        this.activeModal.close();
      },
      (err) => {
        //pop up and error or something
      }
    );
  }
}
