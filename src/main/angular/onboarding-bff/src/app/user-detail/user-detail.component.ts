import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserModel} from "../model/user.model";
import {UserService} from "../service/user.service";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnDestroy {
users: {phoneId:string, userId:string, kind:string, telNumber:string}[] = [
  {phoneId: 'asdlfkjaslfkjasldkfjaslkdf', userId: 'oiuyqweoriuyewu', kind:'Mobile', telNumber: '5145551212'}
  ,{phoneId: '897894213hjkhjfwqd', userId: 'oiuyqweoriuyewu', kind:'Home', telNumber: '5145552121'}
];
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
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  private registerRouteChanges(): void {
    const subscription =
    this.activatedRoute.paramMap.subscribe(params => {
      const userId = params.get("userId");
      if (userId) {
        this.reloadUser(userId);
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
    });
    this.subscriptions.push(subscription);
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      userId: [''],
      firstName: ['', [Validators.required], this.isFirstNameForbiddenAsync.bind(this)],
      lastName: ['', [Validators.required]],
      username: [{value: '', disabled: false}, [Validators.required, this.isNameForbidden.bind(this)] ],
      aliases: this.formBuilder.array([
        this.formBuilder.control(null)
      ])
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
