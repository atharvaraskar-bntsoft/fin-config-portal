export interface IActivationState {
  verifyActivation: any;
  postActivation: any;
}

export const initialIActivationState: IActivationState = {
  postActivation: null,
  verifyActivation: null,
};
