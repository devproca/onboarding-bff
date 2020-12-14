import {Component, OnInit} from '@angular/core';
import {PhoneModel} from "../model/phone.model";
import {PhoneService} from "../service/phone.service";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-phone-list',
  templateUrl: './phone-list.component.html',
  styleUrls: ['./phone-list.component.scss']
})
export class PhoneListComponent implements OnInit {

  userId: string;
  phones: PhoneModel[] = []
  loadingSubscription = Subscription.EMPTY;

  constructor(private route: ActivatedRoute,
              private phoneService: PhoneService,
              private location: Location) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');

    this.loadingSubscription = this.phoneService.findAll(this.userId).subscribe(phones => {
      this.phones = phones;
    })
  }

  delete(phone): void {
    this.phoneService.delete(phone.userId, phone.phoneId).subscribe(noop => {
      this.phones = this.phones.filter(p => p != phone);
    });
  }

  goBack() {
    this.location.back();
  }

}
