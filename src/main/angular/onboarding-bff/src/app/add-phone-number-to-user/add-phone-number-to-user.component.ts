import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { PhoneNumberModel } from '../model/phonenumber.model';
import { UserModel } from '../model/user.model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-add-phone-number-to-user',
  templateUrl: './add-phone-number-to-user.component.html',
  styleUrls: ['./add-phone-number-to-user.component.scss']
})
export class AddPhoneNumberToUserComponent implements OnInit {
  @ViewChild('phoneForm') public phoneForm: NgForm;
  phoneNumber:PhoneNumberModel;
  activeUser: UserModel;
  subscription: Subscription
  constructor(private userService:UserService,
              private modalController: NgbActiveModal) { }

  ngOnInit(): void {
    this.subscription = this.userService.activeUser.subscribe(user => {
      this.activeUser = user;
      this.phoneNumber = {
          phoneNumberId:null,
            phoneNumber : null,
            userId : this.activeUser.userId,
            verified: false,
            verify: null
      } 
    })
    
  }
  closeModal(): void {
    this.modalController.close();
  }

  onSubmit():void{
    if(this.phoneForm.valid){
      this.activeUser.phoneNumbers.push(this.phoneNumber)
      this.userService.update(this.activeUser).subscribe(user => {
        this.modalController.close();
      },err => {

      })
    }
  }

}
