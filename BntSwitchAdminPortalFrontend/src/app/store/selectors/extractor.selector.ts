import { createSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { IExtractorState } from '../state/extractor.state';

export const selectExtractor = (state: IAppState) => state.Extractor;

export const selectExtractors = createSelector(
  selectExtractor,
  (state: IExtractorState) => state.extractor,
);

export const selectExtractorsEdit = createSelector(
  selectExtractor,
  (state: IExtractorState) => state.extractorEdit,
);

export const selectStartExtractor = createSelector(
  selectExtractor,
  (state: IExtractorState) => state.startExtractor,
);

export const selectStopExtractor = createSelector(
  selectExtractor,
  (state: IExtractorState) => state.stopExtractor,
);

export const selectPauseExtractor = createSelector(
  selectExtractor,
  (state: IExtractorState) => state.pauseExtractor,
);

export const selectResumeExtractor = createSelector(
  selectExtractor,
  (state: IExtractorState) => state.resumeExtractor,
);
