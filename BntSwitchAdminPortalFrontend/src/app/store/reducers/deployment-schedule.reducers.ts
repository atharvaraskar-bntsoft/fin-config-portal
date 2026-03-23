import {
  EDeploymentScheduleActions,
  DeploymentScheduleActions,
} from './../actions/deployment-schedule.action';
import { IDeploymentSchedule, initialDeploymentSchedule } from '../state/deployment-schedule.state';
import { Utils } from 'src/utils';

function updateVersion(action) {
  if (action.payload.data && action.payload.data.resultList) {
    const resultList = Utils.newData(action.payload.data.resultList);
    resultList.forEach(result => {
      if (!result.currentVersion) {
        result.currentVersion =
          result.versionListToSchedule &&
          result.versionListToSchedule.length &&
          result.versionListToSchedule[0];
      }
    });
    return resultList.filter(ele => ele.currentVersion !== 0);
  }
}

export function DeploymentScheduleReducer(
  state = initialDeploymentSchedule,
  action: DeploymentScheduleActions,
): IDeploymentSchedule {
  switch (action.type) {
    // case EDeploymentScheduleActions.NewDeploymentListAction:
    //   return {
    //     ...state,
    //     currentScheduledData: rowData,
    //   };
    // case EDeploymentScheduleActions.ScheduleDeploymentList:
    //   return {
    //     ...state,
    //     newlyDeployedData: newDeploymentData
    //   };
    case EDeploymentScheduleActions.EditComponentSuccess:
      return {
        ...state,
        editResponse: action.payload,
      };
    case EDeploymentScheduleActions.FetchNonScheduleSuccess:
      return {
        ...state,
        newlyDeployedData: updateVersion(action),
      };
    case EDeploymentScheduleActions.FetchScheduledSuccess:
      return {
        ...state,
        currentScheduledData: action.payload.data.scheduleDeploymentList,
      };
    case EDeploymentScheduleActions.CreateComponentSuccess:
      return {
        ...state,
        editResponse: action.payload,
      };
    case EDeploymentScheduleActions.FetchClusterListSuccess:
      return {
        ...state,
        clusterList: action.payload.data,
      };
    case EDeploymentScheduleActions.FetchCorePropertiesListSuccess:
      return {
        ...state,
        corePropertiesList: action.payload.data,
      };
    case EDeploymentScheduleActions.ClearState:
      return {
        ...state,
        clusterList: [],
        corePropertiesList: [],
        editResponse: {},
        currentScheduledData: [],
        newlyDeployedData: [],
      };
    // case EDeploymentScheduleActions.CreateComponent:
    //   return {
    //     ...state,
    //     newlyDeployedData:[action.payload, ...state.newlyDeployedData]
    //   };
    default:
      return state;
  }
}
