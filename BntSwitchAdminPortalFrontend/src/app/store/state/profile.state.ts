import { ProfileGetObject } from '@app/models/profile.interface';

export interface IProfileState {
  profile: ProfileGetObject;
  profileResponse: any;
  profileUpdateResponse: any;
}

export const initialProfileState: IProfileState = {
  profile: null,
  profileResponse: null,
  profileUpdateResponse: null,
};
