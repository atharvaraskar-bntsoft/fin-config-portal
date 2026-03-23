export interface IL3AdapterState {
  l3Adapter: any;
  l3AdapterData: any;
  l3AdapterById: any;
  networkList: any;
  postAction: any;
  preAction: any;
  stepList: any;
}

export const initialL3AdapterState: IL3AdapterState = {
  l3Adapter: null,
  l3AdapterData: null,
  l3AdapterById: null,
  networkList: null,
  postAction: null,
  preAction: null,
  stepList: null,
};
