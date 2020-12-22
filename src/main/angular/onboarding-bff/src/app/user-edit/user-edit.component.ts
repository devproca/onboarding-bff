import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { UserModel } from '../model/user.model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit, OnDestroy {
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
  onSubmit(): void {
    this.userService.update(this.activeUser).subscribe(
      (user) => {
        this.activeModal.close();
      },
      (err) => {
        // show some errors
      }
    );
  }
}
