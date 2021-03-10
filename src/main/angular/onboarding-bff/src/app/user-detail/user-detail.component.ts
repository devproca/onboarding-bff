import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserModel} from "../model/user.model";
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  formGroup = this.createForm();

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
      this.formGroup.patchValue(user);
    });
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      userId: null,
      firstName: null,
      lastName: null,
      username: null
    });
  }

  save(): void {
    const valueToSave = this.formGroup.value as UserModel;
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
