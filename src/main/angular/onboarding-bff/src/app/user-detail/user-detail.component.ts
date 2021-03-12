import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserModel} from "../model/user.model";
import {UserService} from "../service/user.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  userDetailForm:FormGroup = null;
  forbiddenUserNames: string[] = ["illegal", "invalid", "fake"];
  forbiddenFirstNames: string[] = ["enigo", "fezik"];

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.userDetailForm = this.createForm();
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
      this.userDetailForm.patchValue(user);
    });
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      userId: [''],
      firstName: ['', [Validators.required], this.isFirstNameForbiddenAsync.bind(this)],
      lastName: ['', [Validators.required]],
      username: ['', [Validators.required, this.isNameForbidden.bind(this)] ],
      aliases: this.formBuilder.array([
        this.formBuilder.control(null)
      ])
    });
  }

  onSubmit(): void {
    const toSave = this.userDetailForm.value as UserModel;

    if (toSave.userId) {
      this.userService.update(toSave).subscribe(_ => this.router.navigateByUrl("/users"));
    } else {
      this.userService.create(toSave).subscribe(_ => this.router.navigateByUrl("/users"));
    }
  }

  cancel(): void {
    this.router.navigateByUrl("/users");
  }

  addAlias(): void {
    const control = new FormControl(null, [Validators.required]);
    this.getAliases().push(control);
  }

  getAliases(): FormArray {
    return this.userDetailForm.get('aliases') as FormArray;
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

}
