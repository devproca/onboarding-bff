import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserModel} from "../model/user.model";
import {UserService} from "../service/user.service";

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
              private userService: UserService) {
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
    });
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      userId: null,
      firstName: null,
      lastName: null,
      username: null,
      phoneNumbers: this.formBuilder.array([
        this.addPhoneNumberFormGroup()
      ])
    });
  }


  addPhoneNumber(): void{
   this.phones = this.userFormGroup.get('phoneNumbers') as FormArray;
   this.phones.push(this.addPhoneNumberFormGroup())
  }

  addPhoneNumberFormGroup(): FormGroup{
  return this.formBuilder.group({
      phoneNumber: '',
    }
  );
  }


  save(): void {
    let valueToSave = this.userFormGroup.value as UserModel;


    if (valueToSave.userId) {
      this.userService.update(valueToSave).subscribe(_ => this.router.navigateByUrl("/users"));
    } else {
      this.userService.create(valueToSave).subscribe(_ => this.router.navigateByUrl("/users"));
    }
  }

  cancel(): void {
    this.router.navigateByUrl("/users");
  }
}
