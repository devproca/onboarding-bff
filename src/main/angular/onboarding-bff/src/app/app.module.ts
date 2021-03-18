import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import { TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {AppComponent} from './app.component';
import {UserListComponent} from './user-list/user-list.component';
import {UserDetailComponent} from './user-detail/user-detail.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule, HttpClient} from "@angular/common/http";
import {DevproHttpInterceptor} from "./service/devpro-http-interceptor";
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AddPhoneModalComponent } from './shared/add-phone-modal/add-phone-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserDetailComponent,
    HomeComponent,
    PageNotFoundComponent,
    AddPhoneModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: DevproHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

export function httpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
