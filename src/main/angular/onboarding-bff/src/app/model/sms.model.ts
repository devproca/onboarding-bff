export class SmsModel {
  verifyId: string;
  phoneNumber: string;
  verifyCode: string;

  constructor(phoneNumber:string) {
    this.verifyCode = null;
    this.verifyId = null;
    this.phoneNumber = phoneNumber;
  }
}
