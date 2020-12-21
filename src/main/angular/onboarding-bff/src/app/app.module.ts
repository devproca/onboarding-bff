import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import {HttpClientModule} from "@angular/common/http";
<<<<<<< HEAD
import {FormsModule} from "@angular/forms";
import { UserDeleteComponent } from './user-delete/user-delete.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { UserEditComponent } from './user-edit/user-edit.component';
=======
import {ReactiveFormsModule} from "@angular/forms";
>>>>>>> quinn

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
<<<<<<< HEAD
    UserDetailComponent,
    UserDeleteComponent,
    UserCreateComponent,
    MainScreenComponent,
    UserEditComponent,
=======
    UserDetailComponent
>>>>>>> quinn
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
<<<<<<< HEAD
    FormsModule,
    AppRoutingModule,
    NgbModule,
=======
    ReactiveFormsModule,
    AppRoutingModule
>>>>>>> quinn
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
