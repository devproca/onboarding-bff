import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../service/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {FormGroup, FormBuilder, FormArray} from "@angular/forms";
import {UserModel} from "../model/user.model";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  formGroup = this.createFormGroup();
  username: string;

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.acquireUser();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  acquireUser(): void {
    this.subscriptions.push(
      this.activatedRoute.paramMap.subscribe(p => {
          this.patchForm(p.get("userId"))
        }
      ));
  }

  patchForm(userId: string): void {
    this.subscriptions.push(
      this.userService.get(userId).subscribe(user => {
        this.formGroup.patchValue(user);
        this.username = user.username;
      })
    );
  }

  onSave(): void {
    const user = this.formGroup.value as UserModel;

    this.userService.update(user).subscribe(_ => {
      this.router.navigateByUrl("users");
    }, error => {
      //this is where you would handle a 400 like a validation error
    });
  }

  onCancel(): void {
    this.router.navigateByUrl("users");
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
