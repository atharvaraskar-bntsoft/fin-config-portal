import { SchemeImfMapperGetObject } from '@app/models/scheme-imf-mapper.interface';

export interface ISchemeImfMapperState {
  builtMapper: any;
  schemeImfMapper: SchemeImfMapperGetObject;
  schemeList: any;
  fieldList: any;
  imfList: any;
  ipcList: any;
  imfVersionList: any;
  mapList: any;
  schemeImfMapperSave: any;
  elFunctionList: any;
  l1AdapterPostResponse: any;
  l1AdapterDeleteResponse: any;
  l1AdapterData: any;
  serviceType: any;
}

export const initialSchemeImfMapperState: ISchemeImfMapperState = {
  builtMapper: null,
  schemeImfMapper: null,
  schemeList: null,
  fieldList: null,
  imfList: null,
  ipcList: null,
  mapList: null,
  schemeImfMapperSave: null,
  elFunctionList: null,
  l1AdapterPostResponse: null,
  l1AdapterDeleteResponse: null,
  l1AdapterData: null,
  imfVersionList: null,
  serviceType: null,
};
