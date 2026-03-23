import { DeviceGetObject, Extractor } from '@app/models/extractor.interface';

export interface IExtractorState {
  extractorEdit: any;
  extractorList: any;
  extractor: any;
  startExtractor: any;
  stopExtractor: any;
  pauseExtractor: any;
  resumeExtractor: any;
}

export const initialExtractorState = {
  extractorEdit: null,
  extractorList: null,
  extractor: null,
  startExtractor: null,
  stopExtractor: null,
  pauseExtractor: null,
  resumeExtractor: null,
};
