import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserModel} from "../model/user.model";
import {UserService} from "../service/user.service";
import {ValidationService} from "../service/validation.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnDestroy {

  phones: FormArray;
  userFormGroup = this.createForm();
  subscriptions: Subscription[] = [];
  numberInUse = false;
  numberRequired = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private validationService: ValidationService) {
  }

  ngOnInit(): void {
    this.registerRouteChanges();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private registerRouteChanges(): void {
    this.subscriptions.push(
      this.activatedRoute.paramMap.subscribe(params => {
        const userId = params.get("userId");
        if (userId) {
          this.reloadUser(userId);
        }
      })
    );
  }

  private reloadUser(userId: string): void {
    this.subscriptions.push(
      this.userService.get(userId).subscribe(user => {
        this.userFormGroup.patchValue(user);
        let phones = this.userFormGroup.get('phoneNumbers') as FormArray;
        phones.clear();
        for (let i = 0; i < user.phoneNumbers.length; i++) {
          phones.push(this.addPhoneNumberFormGroup(user.phoneNumbers[i].phoneNumber, user.phoneNumbers[i].phoneId));
        }
      }));
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      userId: null,
      firstName: [null, [Validators.required, Validators.maxLength(50)]],
      lastName: [null, [Validators.required, Validators.maxLength(50)]],
      username: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      phoneNumbers: this.formBuilder.array([this.addPhoneNumberFormGroup('', '')])
    });
  }

  addPhoneNumber(): void {
    this.phones = this.userFormGroup.get('phoneNumbers') as FormArray;
    this.phones.push(this.addPhoneNumberFormGroup('', ''))
  }


  addPhoneNumberFormGroup(phoneNumber: string, id: string): FormGroup {
    this.numberRequired = false;
    if (phoneNumber) {
      return this.formBuilder.group({
          phoneNumber: [phoneNumber, [Validators.required, Validators.pattern(this.validationService.phoneValidation)]],
          phoneId: id,
        }
      );
    }
    return this.formBuilder.group({
        phoneNumber: ['', [Validators.required, Validators.pattern(this.validationService.phoneValidation)]],
        phoneId: id,
      }
    );
  }

  save(): void {
    if (this.userFormGroup.valid) {
      let valueToSave = this.userFormGroup.value as UserModel;
      if (valueToSave.userId) {
        this.subscriptions.push(
          this.userService.update(valueToSave).subscribe(_ => this.router.navigateByUrl("/users"), error => {
            if (this.userFormGroup.get('phoneNumbers.length')) {
              this.numberInUse = true;
            } else if (!this.userFormGroup.get('phoneNumbers.length')) {
              this.numberRequired = true;
            } else {
              console.log(error);
            }
          }));
      } else {
        this.subscriptions.push(
          this.userService.create(valueToSave).subscribe(_ => this.router.navigateByUrl("/users"), error => {
            if (this.userFormGroup.get('phoneNumbers.length')) {
              this.numberInUse = true;
            } else if (!this.userFormGroup.get('phoneNumbers.length')) {
              this.numberRequired = true;
            } else {
              console.log(error);
            }
          }));
      }
    }
  }

  deleteNumber(index: number): void {
    let phones = this.userFormGroup.get('phoneNumbers') as FormArray;
    if (phones.length > 1) {
      phones.removeAt(index);
    } else {
      this.numberRequired = true;
    }
  }

  cancel(): void {
    this.router.navigateByUrl("/users");
  }
}
