import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserModel} from "../model/user.model";
import {UserService} from "../service/user.service";
import {ValidationService} from "../service/validation.service";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  phones: FormArray;
  userFormGroup = this.createForm();


  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private validationService: ValidationService) {
  }

  ngOnInit(): void {
    this.registerRouteChanges();
  }


  private registerRouteChanges(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const userId = params.get("userId");
      if (userId) {
        this.reloadUser(userId);
      }
    });
  }

  private reloadUser(userId: string): void {
    this.userService.get(userId).subscribe(user => {
      this.userFormGroup.patchValue(user);
      let phones = this.userFormGroup.get('phoneNumbers') as FormArray;
      for (let i = 0; i < user.phoneNumbers.length; i++) {
        phones.push(this.addPhoneNumberFormGroup(user.phoneNumbers[i].phoneNumber));
      }
    });
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      userId: null,
      firstName: [null, [Validators.required, Validators.maxLength(50)]],
      lastName: [null, [Validators.required, Validators.maxLength(50)]],
      username: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      phoneNumbers: this.formBuilder.array([])
    });
  }


  addPhoneNumber(): void {
    this.phones = this.userFormGroup.get('phoneNumbers') as FormArray;
    this.phones.push(this.addPhoneNumberFormGroup(''))
  }


  addPhoneNumberFormGroup(phoneNumber: string): FormGroup {
    if (phoneNumber) {
      return this.formBuilder.group({
          phoneNumber: [phoneNumber, [Validators.required, Validators.pattern(this.validationService.phoneValidation)]],
        }
      );
    }
    return this.formBuilder.group({
        phoneNumber: ['', [Validators.required, Validators.pattern(this.validationService.phoneValidation)]],
      }
    );
  }


  save(): void {
    if (this.userFormGroup.dirty && this.userFormGroup.valid) {
      let valueToSave = this.userFormGroup.value as UserModel;

      if (valueToSave.userId) {
        this.userService.update(valueToSave).subscribe(_ => this.router.navigateByUrl("/users"));
      } else {
        this.userService.create(valueToSave).subscribe(_ => this.router.navigateByUrl("/users"));
      }
    } else {
      console.log(this.userFormGroup.get('firstName').errors)
    }
  }

  cancel(): void {
    this.router.navigateByUrl("/users");
  }
}
