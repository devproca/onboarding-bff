import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhonenumberCreateComponent } from './phonenumber-create.component';

describe('PhonenumberCreateComponent', () => {
  let component: PhonenumberCreateComponent;
  let fixture: ComponentFixture<PhonenumberCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhonenumberCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhonenumberCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
