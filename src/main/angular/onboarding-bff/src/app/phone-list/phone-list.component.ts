import { Component, OnInit, Input } from '@angular/core';
import {PhoneNumberModel} from "../model/phone-number.model";
import {Subscription} from "rxjs";
import {PhoneService} from "../service/phone.service";


@Component({
  selector: 'app-phone-list',
  templateUrl: './phone-list.component.html',
  styleUrls: ['./phone-list.component.scss']
})
export class PhoneListComponent implements OnInit {

  loadingSubscription = Subscription.EMPTY;

  phoneNumbers: PhoneNumberModel[] = [];
  @Input() userId: string;

  constructor(private phoneService: PhoneService) { }

  ngOnInit(): void {
    // this.loadPhoneNumbers();
  }

  loadPhoneNumbers(): void {
    this.loadingSubscription = this.phoneService.findAll(this.userId).subscribe(phones => {
      this.phoneNumbers = phones;
    })
  }
}
