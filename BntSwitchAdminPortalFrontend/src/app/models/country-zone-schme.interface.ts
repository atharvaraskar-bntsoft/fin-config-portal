export interface ICountryZoneScheme {
  id: number;
  countryCode: string;
  countryName: string;
  deleted: string;
  scheme: string;
  active: boolean;
  zoneCode: string;
  createdBy: number;
  createdOn: number;
  updatedBy: number;
  updatedOn: number;
}
export interface ICountryZoneCreate {
  data: any;
  status: string;
  messgae: string;
}
