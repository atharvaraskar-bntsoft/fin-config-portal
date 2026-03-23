export interface INewPassState {
  newPass: any;
  selectedNewPass: any;
  ResponseSuccess: any;
}

export const initialNewPassState: INewPassState = {
  newPass: null,
  // tslint:disable-next-line: object-literal-sort-keys
  ResponseSuccess: null,
  selectedNewPass: null,
};
