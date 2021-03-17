import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from '@ngx-translate/core';
import { TranslateMockPipe } from '../mocks/translate-mock-pipe';
import { TranslateMockService } from '../mocks/translate-mock-service';
import { UserService } from '../service/user.service';
import { UserMockService } from '../mocks/user-mock-service';
import { Router } from '@angular/router';

import { UserListComponent } from './user-list.component';


describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UserListComponent,
        TranslateMockPipe
      ],
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        {provide: TranslateService, useClass: TranslateMockService},
        {provide: UserService, useClass: UserMockService}
    ]
  })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const navigateSpy = spyOn(router, 'navigate');
    expect(component).toBeTruthy();
  });
});
