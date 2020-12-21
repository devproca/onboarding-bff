import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
<<<<<<< HEAD
import { MainScreenComponent } from './main-screen/main-screen.component';

const routes: Routes = [
  {path: '', component: MainScreenComponent},
  
=======
import {UserListComponent} from "./user-list/user-list.component";
import {UserDetailComponent} from "./user-detail/user-detail.component";

const routes: Routes = [
  {path: 'user-list', component: UserListComponent},
  {path: 'user-detail', component: UserDetailComponent},
  {path: 'user-detail/:id', component: UserDetailComponent}
>>>>>>> quinn
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
