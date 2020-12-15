import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserModel} from "../model/user.model";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../service/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;
  subscriptions: Subscription[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.formGroup = this.createFormGroup();
    this.registerRouteParamChanges();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private registerRouteParamChanges(): void {
    this.subscriptions.push(
      this.route.paramMap.subscribe(params => {
        const id = params.get("id");
        this.reloadUser(id);
      })
    );
  }

  private reloadUser(id: string): void {
    if (id) {
      this.userService.get(id).subscribe(user => {
        this.formGroup.patchValue(user);
      });
    } else {
      this.formGroup.reset();
    }
  }

  save() {
    const valueToSave = this.formGroup.value as UserModel;
    this.userService.create(valueToSave).subscribe(_ => {
      this.goBack();
    }, (httpError) => {
      const errors = httpError.error;
      Object.keys(errors)
        .forEach(k => this.formGroup.get(k).setErrors({"error": errors[k]}));
    });
  }

  update() {
    const valueToSave = this.formGroup.value as UserModel;
    this.userService.update(valueToSave).subscribe(savedUser => {
      this.goBack();
    });
  }

  userId() {
    return this.formGroup.get("userId").value;
  }

  isCreate() {
    return !this.userId();
  }

  goBack() {
    this.router.navigateByUrl("users");
  }

  get firstNameControl(): FormControl {
    return this.formGroup.get("firstName") as FormControl;
  }

  get lastNameControl(): FormControl {
    return this.formGroup.get("lastName") as FormControl;
  }

  get userNameControl(): FormControl {
    return this.formGroup.get("username") as FormControl;
  }

  private createFormGroup(): FormGroup {
    return this.formBuilder.group({
      userId: '',
      firstName: '',
      lastName: '',
      username: ''
    });
  }
}
