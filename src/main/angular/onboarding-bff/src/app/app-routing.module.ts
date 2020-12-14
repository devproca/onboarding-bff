import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserDetailComponent} from "./user-detail/user-detail.component";
import {UserListComponent} from "./user-list/user-list.component";
import {PhoneDetailComponent} from "./phone-detail/phone-detail.component";
import {PhoneListComponent} from "./phone-list/phone-list.component";
import {VerifyComponent} from "./verify/verify.component";

const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'users', component: UserListComponent },
  { path: 'detail', component: UserDetailComponent },
  { path: 'detail/:id', component: UserDetailComponent },
  { path: 'phones/:id', component: PhoneListComponent },
  { path: 'phone-detail/:id', component: PhoneDetailComponent },
  { path: 'phone-detail/:id/:phoneId', component: PhoneDetailComponent },
  { path: 'verify/:phoneId', component: VerifyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
