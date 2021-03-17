import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from '@ngx-translate/core';
import { TranslateMockPipe } from '../mocks/translate-mock-pipe';
import { TranslateMockService } from '../mocks/translate-mock-service';
import { UserService } from '../service/user.service';
import { UserMockService } from '../mocks/user-mock-service';
import { Router } from '@angular/router';

import { UserDetailComponent } from './user-detail.component';
import { FormBuilder } from '@angular/forms';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UserDetailComponent,
        TranslateMockPipe
      ],
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        {provide: TranslateService, useClass: TranslateMockService},
        {provide: UserService, useClass: UserMockService},
        FormBuilder
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
