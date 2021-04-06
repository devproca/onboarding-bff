import { Component, OnInit, Input } from '@angular/core';
import {PhoneNumberModel} from "../model/phone-number.model";
import {Subscription} from "rxjs";
import {PhoneService} from "../service/phone.service";
import {DialogConfig} from "../angular-components/dialog/dialog-config.model";
import {DialogComponent} from "../angular-components/dialog/dialog.component";
import {UserModel} from "../model/user.model";


@Component({
  selector: 'app-phone-list',
  templateUrl: './phone-list.component.html',
  styleUrls: ['./phone-list.component.scss']
})
export class PhoneListComponent implements OnInit {

  loadingSubscription = Subscription.EMPTY;

  phoneNumbers: PhoneNumberModel[] = [];
  @Input() userId: string;
  @Input() fullUser: UserModel;

  constructor(private phoneService: PhoneService,
              private dialogConfig: DialogConfig,
              private dialogComponent: DialogComponent) { }

  ngOnInit(): void {
    this.userId = this.dialogConfig.data.userId;
    this.fullUser = this.dialogConfig.data.user;
    this.loadPhoneNumbers();
  }

  loadPhoneNumbers(): void {
    this.loadingSubscription = this.phoneService.findAll(this.userId).subscribe(phones => {
      this.phoneNumbers = phones;
    })
  }

  // TODO: Remove redundant function if close button is not used in footer.
  closeDialog(): void {
    this.dialogComponent.close('SAVED');
  }
}
