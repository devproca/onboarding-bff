import { Component, forwardRef, HostBinding, Input } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-phonenumber-create',
  templateUrl: './phonenumber-create.component.html',
  styleUrls: ['./phonenumber-create.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhonenumberCreateComponent),
      multi: true,
    },
  ],
})
export class PhonenumberCreateComponent implements ControlValueAccessor {
  constructor() {}

  onChange: any = () => {};
  onTouch: any = () => {};

  val = { phonenumber1: '', phonenumber2: '' }; // this is the updated value that the class accesses

  // this method sets the value programmatically
  writeValue(value: any) {
    this.val = { ...value };
  }
  // upon UI element value changes, this method gets triggered
  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  // upon touching the element, this method gets triggered
  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  public notifyChanges(value): void {
    this.val = value;
    this.onChange(this.val);
    this.onTouch(this.val);
  }
}
