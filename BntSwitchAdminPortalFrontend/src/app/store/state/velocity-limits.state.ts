import { currentItem } from '@app/models/velocity-limits.interface';

export interface IVelocityLimitsState {
  Velocitylimits: [];
  selectedVelocityLimits: any;
  velocityLimitsResponseSuccess: [];
  Velocitylimitsedittransaction: [];
  selectedVelocityLimitsEditTransaction: any;
  Velocitylimitseditinstitution: [];
  selectedVelocityLimitsEditInstitution: any;
  Velocitylimitseditcurrency: [];
  selectedVelocityLimitsEditCurrency: any;
  Velocitylimitseditrow: [];
  selectedVelocityLimitsEditRow: any;
  Velocitylimitsdelete: any;
  selectedVelocityLimitsDelete: any;
  Velocitylimitsupdate: [];
  selectedVelocityLimitsUpdate: any;
  Velocitylimitscreate: any;
  selectedVelocityLimitsCreate: any;
}

export const initialVelocityLimitsState: IVelocityLimitsState = {
  Velocitylimits: null,
  Velocitylimitscreate: null,
  Velocitylimitsdelete: null,
  Velocitylimitseditcurrency: null,
  Velocitylimitseditinstitution: null,
  Velocitylimitseditrow: null,
  Velocitylimitsedittransaction: null,
  Velocitylimitsupdate: null,
  selectedVelocityLimits: null,
  selectedVelocityLimitsCreate: null,
  selectedVelocityLimitsDelete: null,
  selectedVelocityLimitsEditCurrency: null,
  selectedVelocityLimitsEditInstitution: null,
  selectedVelocityLimitsEditRow: null,
  selectedVelocityLimitsEditTransaction: null,
  selectedVelocityLimitsUpdate: null,
  velocityLimitsResponseSuccess: null,
};
