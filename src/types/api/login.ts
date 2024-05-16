import { HttpStatusCode } from 'axios';
import { UserProfile } from '../auth';
export type LoginResponse = {
  meta: {
    code: HttpStatusCode;
    message: string;
  };
  data: {
    accessToken: string,
    refreshToken: string,
    user: UserProfile,
  };
};
