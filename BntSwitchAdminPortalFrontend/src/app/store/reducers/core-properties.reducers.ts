import {
    CorePropertiesActions,
    ECorePropertiesActions,
  } from '../actions/core-properties.action';
  import {
    initialCorePropertiesState,
    ICorePropertiesState,
  } from '../state/core-properties.state';
  
  export function CorePropertiesReducers(
    state = initialCorePropertiesState,
    action: CorePropertiesActions,
  ): ICorePropertiesState {
    switch (action.type) {   
      case ECorePropertiesActions.GetCorePropertiesSuccess: {
        return {
          ...state,
          CorePropertiesGet: action.payload,
        };
      }
      case ECorePropertiesActions.GetByIdCorePropertiesSuccess: {
        return {
          ...state,
          CorePropertiesGetById: action.payload,
        };
      }
      case ECorePropertiesActions.GetDefaultCorePropertiesSuccess: {
        return {
          ...state,
          CorePropertiesGet: action.payload,
        };
      }
      case ECorePropertiesActions.PostCorePropertiesSuccess: {
        return {
          ...state,
          CorePropertiesPost: action.payload,
        };
      }
      case ECorePropertiesActions.UpdateCorePropertiesSuccess: {
        return {
          ...state,
          CorePropertiesUpdate: action.payload,
        };
      }
  
      case ECorePropertiesActions.ClearState: {
        return {
          ...state,
          CorePropertiesGet: null,
          CorePropertiesGetById: null,
          CorePropertiesPost: null,
          CorePropertiesUpdate: null,
        };
      }
      default:
        return state;
    }
  }
  