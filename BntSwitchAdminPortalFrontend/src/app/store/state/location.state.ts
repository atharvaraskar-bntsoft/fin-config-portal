import { LocationGetObject } from '../../models/location.interface';

export interface ILocationState {
  Location: LocationGetObject;
  LocationDetail: any;
  locationResponse: any;
  selectedLocation: any;
}

export const initialLocationState: ILocationState = {
  Location: null,
  LocationDetail: null,
  locationResponse: null,
  selectedLocation: null,
};
