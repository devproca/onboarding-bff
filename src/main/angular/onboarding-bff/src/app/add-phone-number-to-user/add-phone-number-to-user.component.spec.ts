import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPhoneNumberToUserComponent } from './add-phone-number-to-user.component';

describe('AddPhoneNumberToUserComponent', () => {
  let component: AddPhoneNumberToUserComponent;
  let fixture: ComponentFixture<AddPhoneNumberToUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPhoneNumberToUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPhoneNumberToUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
