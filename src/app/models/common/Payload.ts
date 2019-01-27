import { UserInfo } from './UserInfo';
import { Error } from './Error';

export class Payload {
  error: Error;
  data: any[];
  datacount: number;
  userInfo: UserInfo;
}
