import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';

import { Subscription } from "rxjs";

import { UserModel } from "../model/user.model";
import { PhoneNumberModel } from "../model/phone-number.model";
import { PhoneService } from "../service/phone.service";
import { DialogConfig } from "../angular-components/dialog/dialog-config.model";
import { PopperComponent } from "../angular-components/popper/popper.component";


@Component({
  selector: 'app-phone-list',
  templateUrl: './phone-list.component.html',
  styleUrls: ['./phone-list.component.scss']
})
export class PhoneListComponent implements OnInit, OnDestroy {
  loadingSubscription = Subscription.EMPTY;
  phoneNumbers: PhoneNumberModel[] = [];

  @Input() user: UserModel;
  @ViewChild('refDelete') private deletePopper: PopperComponent;

  constructor(private phoneService: PhoneService,
              private dialogConfig: DialogConfig) {
  }

  ngOnInit(): void {
    this.user = this.dialogConfig.data.user;
    this.loadPhoneNumbers();
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

  loadPhoneNumbers(): void {
    this.loadingSubscription = this.phoneService.findAll(this.user.userId).subscribe(phones => {
      this.phoneNumbers = phones;
    })
  }

  deletePhoneNumber(phone: PhoneNumberModel): void {
    this.phoneService.delete(phone.userId, phone.phoneId).subscribe(() => this.loadPhoneNumbers());
  }

  handleCancelDelete() {
    this.deletePopper.hide();
  }
}
