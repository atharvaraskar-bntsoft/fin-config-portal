import { MerchantGetObject } from '@app/models/merchant-code-mapping.interface';

export interface IMerchantCodeMappingState {
  merchantCodeMapping: MerchantGetObject;
  selectedMerchantCodeMapping: MerchantGetObject;
  deleteMerchantCodeMapping: any;
  merchantCodeMappingRow: any;
  merchantCodeMappingPostResponse: any;
  merchantConfigueData: any;
}

export const initialMerchantCodeMappingState: IMerchantCodeMappingState = {
  deleteMerchantCodeMapping: null,
  merchantCodeMapping: null,
  merchantCodeMappingPostResponse: null,
  merchantCodeMappingRow: null,
  selectedMerchantCodeMapping: null,
  merchantConfigueData: null,
};
