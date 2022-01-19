import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {UserComponent} from "./user/user.component";

const routes: Routes = [
  {path: "users", component: UserComponent},
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
