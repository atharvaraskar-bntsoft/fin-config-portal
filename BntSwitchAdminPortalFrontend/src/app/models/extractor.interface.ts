export interface Extractor {
  id: string;
  name: string;
}

export interface ExtractorGetData {
  'total-record': number;
  'page-no': number;
  //extractorList: extractorList[];
  'total-filtered-record': number;
}

export interface DeviceGetObject {
  status: string;
  message: string;
  data: ExtractorGetData;
}
