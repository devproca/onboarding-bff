import {PhoneNumberModel} from "./phoneNumber.model";

export class UserModel {
  userId: string;
  firstName: string;
  lastName: string;
  username: string;
  phoneNumbers: PhoneNumberModel[] = [];
}
