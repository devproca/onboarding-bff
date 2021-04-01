import {PhoneNumberModel} from "./phone-number.model";

export class UserModel {
  userId: string;
  firstName: string;
  lastName: string;
  username: string;
  phoneNumbers: PhoneNumberModel[] = [];
}
