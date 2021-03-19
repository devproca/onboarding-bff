import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhoneModel } from 'src/app/model/phone.model';

@Component({
  selector: 'app-add-phone-modal',
  templateUrl: './add-phone-modal.component.html',
  styleUrls: ['./add-phone-modal.component.scss']
})
export class AddPhoneModalComponent implements OnInit {

  @Input() srcPhone: PhoneModel = null;
  @Output() closeModal = new EventEmitter<PhoneModel>();
  addPhoneForm:FormGroup = null;
  result: PhoneModel = new PhoneModel();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.addPhoneForm = this.createForm();
    if (this.srcPhone !== null) {
      this.addPhoneForm.patchValue(this.srcPhone);
    }
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      kind: ['', [Validators.required]],
      telNumber: ['', [Validators.required, Validators.pattern(/^\d{3}-\d{3}-\d{4}$/)]]
    });
  }

  onDismissModal() {
    this.closeModal.emit(this.result);
  }

  onAddPhone() {
    this.result = this.addPhoneForm.value as PhoneModel;
    this.onDismissModal();
  }

}
