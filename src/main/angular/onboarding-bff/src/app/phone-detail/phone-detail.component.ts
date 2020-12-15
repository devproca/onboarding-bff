import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PhoneModel} from "../model/phone.model";
import { Location } from '@angular/common';
import {PhoneService} from "../service/phone.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-phone-detail',
  templateUrl: './phone-detail.component.html',
  styleUrls: ['./phone-detail.component.scss']
})
export class PhoneDetailComponent implements OnInit {

  formGroup: FormGroup;
  userId: string;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private location: Location, private phoneService: PhoneService) { }

  ngOnInit(): void {
    this.formGroup = this.createFormGroup();
    //change to listen to route changes param map.
    this.userId = this.route.snapshot.paramMap.get('id');
    this.formGroup.patchValue({"userId": this.userId});

    const phoneId = this.route.snapshot.paramMap.get('phoneId');

    if (phoneId) {
      this.phoneService.get(this.userId, phoneId).subscribe(phone => {
        this.formGroup.patchValue(phone);
      })
    }
  }

  save(): void {
    const valueToSave = this.formGroup.value as PhoneModel;
    this.phoneService.create(valueToSave).subscribe(savedUser => {
      console.log("it worked!");
    });
  }

  update() : void {
    const valueToSave = this.formGroup.value as PhoneModel;
    this.phoneService.update(valueToSave).subscribe(savedUser => {
      this.goBack();
    });
  }

  isVerified(): boolean {
    return false;
  }

  isCreate(): boolean {
    return !this.formGroup.get('phoneId').value;
  }

  goBack() {
    this.location.back();
  }

  get phoneNumberControl(): FormControl {
    return this.formGroup.get("phoneNumber") as FormControl;
  }

  private createFormGroup(): FormGroup {
    const phoneNumber = "[0-9]{0-10}";
    return this.formBuilder.group({
      userId: '',
      phoneId: '',
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern(phoneNumber)]),
      isVerified: false
    })
  }

}
