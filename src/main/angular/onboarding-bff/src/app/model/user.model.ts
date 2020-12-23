import { PhoneNumberModel } from './phonenumber.model';

export interface UserModel {
  userId: string;
  firstName: string;
  lastName: string;
  username: string;
  phoneNumbers: PhoneNumberModel[];
}
