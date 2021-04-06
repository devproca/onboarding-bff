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
import { PhoneListComponent } from './phone-list/phone-list.component';
import { DialogBodyComponent } from './angular-components/dialog-body/dialog-body.component';
import { DialogFooterComponent } from './angular-components/dialog-footer/dialog-footer.component';
import { DialogHeaderComponent } from './angular-components/dialog-header/dialog-header.component';
import { DialogComponent } from './angular-components/dialog/dialog.component';
import { SvgComponent } from './angular-components/svg/svg.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserDetailComponent,
    SpinnerComponent,
    UserEditComponent,
    PhoneDetailComponent,
    PopperComponent,
    PhoneListComponent,
    DialogBodyComponent,
    DialogFooterComponent,
    DialogHeaderComponent,
    DialogComponent,
    SvgComponent
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
