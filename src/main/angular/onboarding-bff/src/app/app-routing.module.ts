import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserListComponent} from "./user-list/user-list.component";
import {UserDetailComponent} from "./user-detail/user-detail.component";
import {VerifyComponent} from "./verify/verify.component";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";


const routes: Routes = [
  {
    path: 'users',
    component: UserListComponent
  },
  {
    path: 'verify',
    component: VerifyComponent
  },
  {
    path: 'users/create',
    component: UserDetailComponent
  },
  {
    path: 'users/:userId',
    component: UserDetailComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
  ]
})
export class AppRoutingModule {
}
