import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserModel} from "../model/user.model";
import {UserService} from "../service/user.service";
import {Observable, Subscription} from "rxjs";
import { PhoneModel } from '../model/phone.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnDestroy {

  userIdForUpdate: string = null;
  formValueChanges: string = null;
  showModal: boolean = false;
  userDetailForm:FormGroup = null;
  subscriptions: Subscription[] = [];
  forbiddenUserNames: string[] = ["illegal", "invalid", "fake"];
  forbiddenFirstNames: string[] = ["inigo", "fezzik"];

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.userDetailForm = this.createForm();
    this.registerRouteChanges();
    const subscription =
    this.userDetailForm.valueChanges.subscribe(val => {
      this.formValueChanges = JSON.stringify(val);
    });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  private registerRouteChanges(): void {
    const subscription =
    this.activatedRoute.paramMap.subscribe(params => {
      this.userIdForUpdate = params.get("userId");
      if (this.userIdForUpdate) {
        this.reloadUser(this.userIdForUpdate);
      }
    });
    this.subscriptions.push(subscription);
  }

  private reloadUser(userId: string): void {
    if (this.userDetailForm.controls.username){
      this.userDetailForm.controls.username.disable();
    }
    const subscription =
    this.userService.get(userId).subscribe(user => {
      this.userDetailForm.patchValue(user);
      user.phones.forEach(ph => this.onHandleAddUserPhone(ph));
    });
    this.subscriptions.push(subscription);
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      userId: [''],
      firstName: ['', [Validators.required], this.isFirstNameForbiddenAsync.bind(this)],
      lastName: ['', [Validators.required]],
      username: [{value: '', disabled: false}, [Validators.required, this.isNameForbidden.bind(this)] ],
      phones: this.formBuilder.array([ ])
    });
  }

  onSubmit(): void {
    const toSave = this.userDetailForm.value as UserModel;
    if (toSave.userId) {
      const subscription =
      this.userService.update(toSave)
        .subscribe(_ => this.router.navigateByUrl("/users")
        ,(error: string) => window.alert(error)  );
        this.subscriptions.push(subscription);
      } else {
      const subscription =
      this.userService.create(toSave)
        .subscribe(_ => this.router.navigateByUrl("/users")
        , (error: string) => window.alert(error));
        this.subscriptions.push(subscription);
      }
  }

  cancel(): void {
    this.router.navigateByUrl("/users");
  }


  isFirstNameForbiddenAsync(control: FormControl): Promise<any> | Observable<any> {
    return new Promise<any>(
      (resolve, reject) => {
        setTimeout(() => {
          if (this.forbiddenFirstNames.indexOf(control.value) !== -1) {
            resolve( { 'forbiddenFirstName': true } );
          } else {
            resolve(null);
          }
        }, 1100);
      }
    );
  }

  isNameForbidden(control: FormControl): {[key:string]: boolean} | null {
       return (this.forbiddenUserNames.indexOf(control.value) !== -1) ?
            { 'forbiddenUserName': true } : null;
  }

  showAddPhoneModal(): void {
    this.showModal = !this.showModal;
    //this.logKeyValuePairs(this.userDetailForm)
  }

  onHandleAddUserPhone(newPhone: PhoneModel): void {
    if (newPhone.telNumber) {
      (<FormArray>this.userDetailForm.get('phones')).push( this.addPhoneFormGroup(newPhone) );
    }
    this.showModal = false;
  }

  addPhoneFormGroup(srcPhone: PhoneModel): FormGroup {
    return this.formBuilder.group({
      userId: [this.userIdForUpdate],
      phoneId: [srcPhone.phoneId],
      kind: [srcPhone.kind],
      telNumber: [srcPhone.telNumber]
    });
  }

  logKeyValuePairs(group: FormGroup): void {
   Object.keys(group.controls).forEach( (key: string) => {
     const abstractControl = group.get(key);
     if (abstractControl instanceof FormGroup) {
      this.logKeyValuePairs(abstractControl);
     } else {
       console.log(`Key= ${key}   Value=${abstractControl.value}`);
     }
   });
  }
}
