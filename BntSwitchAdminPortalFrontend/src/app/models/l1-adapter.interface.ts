export interface ModeOfEntry {
  id: number;
  magneticStripeRead: boolean;
  keyedCardNotPresent: boolean;
  emvChip: boolean;
}

export interface TradeTypeValidation {
  id: number;
  recurringTxn: boolean;
  gamingAndBetting: boolean;
  bureauxDeChange: boolean;
}

export interface FinancialValidation {
  id: number;
  binData: string;
  sale: boolean;
  refund: boolean;
  reversal: boolean;
}

export interface ResultList {
  id: number;
  binIdentification: string;
  binRangeStart: string;
  binRangeEnd: string;
  ownerICAId: string;
  ownerICAName: string;
  countryCode: string;
  currencyCode: string;
  acceptanceBrand: string;
  brandProduct: string;
  localUse: string;
  pin: string;
  internetCardHolderVerification: string;
  cardOwner: string;
  binDataStatus: string;
  deleted: string;
  modeOfEntry: ModeOfEntry;
  tradeTypeValidation: TradeTypeValidation;
  financialValidation: FinancialValidation;
  status?: any;
}

export interface L1AdapterGetData {
  'total-record': number;
  'page-no': number;
  resultList: ResultList[];
  'total-filtered-record': number;
}

export interface L1AdapterGetObject {
  status: string;
  message: string;
  data: L1AdapterGetData;
}

export interface IHeaders {
  key: string;
  width?: string;
}

export interface IL1SchemaTableProps {
  pad: string;
  length: string;
  name: string;
  id: string;
  class: string;
}

export interface IL1SchemaSoapTemplateTableProps extends IL1SchemaTableProps {
  value: string;
}
