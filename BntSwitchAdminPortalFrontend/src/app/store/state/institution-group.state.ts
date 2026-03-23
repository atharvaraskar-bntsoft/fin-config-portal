import { InstitutionGroupGetObject } from '../../models/institution-group.interface';

export interface IInstitutionGroupState {
  institutionGroups: InstitutionGroupGetObject;
  selectedInstitutionGroup: any;
  institutionGroupResponse: any;
  institutionGroupResponseSucess: any;
  institutionGroupDetails: any;
  selectedInstitutionGroupDetails: any;
  institutionList: any;
  institutionGroupStatus: any;
  selectedInstitutionGroupStatus: any;
}

export const initialInstitutionGroupState: IInstitutionGroupState = {
  institutionGroupDetails: null,
  institutionGroupResponse: null,
  institutionGroupResponseSucess: null,
  institutionGroupStatus: null,
  institutionGroups: null,
  institutionList: null,
  selectedInstitutionGroup: null,
  selectedInstitutionGroupDetails: null,
  selectedInstitutionGroupStatus: null,
};
