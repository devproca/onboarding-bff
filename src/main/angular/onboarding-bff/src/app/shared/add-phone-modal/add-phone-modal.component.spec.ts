import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPhoneModalComponent } from './add-phone-modal.component';

describe('AddPhoneModalComponent', () => {
  let component: AddPhoneModalComponent;
  let fixture: ComponentFixture<AddPhoneModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPhoneModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPhoneModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
