import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UserListComponent} from './user-list/user-list.component';
import {UserDetailComponent} from './user-detail/user-detail.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { SpinnerComponent } from './angular-components/spinner/spinner.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { PhoneDetailComponent } from './phone-detail/phone-detail.component';
import { PopperComponent } from './angular-components/popper/popper.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserDetailComponent,
    SpinnerComponent,
    UserEditComponent,
    PhoneDetailComponent,
    PopperComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
