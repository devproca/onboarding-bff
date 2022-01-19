import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserListComponent} from "./user-list/user-list.component";
import {UserDetailComponent} from "./user-detail/user-detail.component";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {AuthGuard} from "./guard/auth.guard";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  {
    path: "users",
    component: UserListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "users/create",
    component: UserDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "users/:userId",
    component: UserDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "login",
    component: LoginComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ]
})
export class AppRoutingModule {
}
