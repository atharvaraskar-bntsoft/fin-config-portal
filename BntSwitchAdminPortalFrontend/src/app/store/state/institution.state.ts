import { InstitutionGetObject } from '../../models/institution.interface';

export interface IInstitutionState {
  CategoryCode: any;
  Currency: any;
  Institution: InstitutionGetObject;
  selectedInstitution: any;
  InstitutionAdditionalService: any;
  institutionResponse: any;
  InstitutionDetail: any;
  InstitutionService: any;
  institutionGroupList: any;
  institutionRowData: any;
  countryList: any;
  stateList: any;
}

export const initialInstitutionState: IInstitutionState = {
  CategoryCode: null,
  Currency: null,
  Institution: null,
  InstitutionAdditionalService: null,
  InstitutionDetail: null,
  InstitutionService: null,
  countryList: null,
  institutionGroupList: null,
  institutionResponse: null,
  institutionRowData: null,
  selectedInstitution: null,
  stateList: null,
};
