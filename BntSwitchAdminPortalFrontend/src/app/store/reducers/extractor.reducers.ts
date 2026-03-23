import { IExtractorState, initialExtractorState } from '../state/extractor.state';
import { EextractorActions, ExtractorAction } from '../actions/extractor.action';

export function ExtractorReducers(
  state = initialExtractorState,
  action: ExtractorAction,
): IExtractorState {
  switch (action.type) {
    case EextractorActions.GetExtractorSuccess: {
      return {
        ...state,
        extractor: action.payload,
      };
    }
    case EextractorActions.PutExtractorSuccess: {
      return {
        ...state,
        extractorEdit: action.payload,
      };
    }
    case EextractorActions.StartExtractorSuccess: {
      return {
        ...state,
        startExtractor: action.payload,
      };
    }
    case EextractorActions.StopExtractorSuccess: {
      return {
        ...state,
        stopExtractor: action.payload,
      };
    }
    case EextractorActions.PauseExtractorSuccess: {
      return {
        ...state,
        pauseExtractor: action.payload,
      };
    }
    case EextractorActions.ResumeExtractorSuccess: {
      return {
        ...state,
        resumeExtractor: action.payload,
      };
    }

    case EextractorActions.ClearState: {
      return {
        ...state,
        extractor: null,
        startExtractor: null,
        stopExtractor: null,
        pauseExtractor: null,
        resumeExtractor: null,
      };
    }

    default:
      return state;
  }
}
