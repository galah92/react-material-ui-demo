export const defaultParams = {
  ID: "UpdateConfigurationEditor",
  variables: [
    { ActualName: "MPR.read_from_file", Value: false },
    { ActualName: "Cfg.MonitoredRoomDims", Value: [0, 0, 0, 0, 0, 0] },
    { ActualName: "Cfg.imgProcessing.substractionMode", Value: 0 },
    { ActualName: "Cfg.TargetProperties.MaxPersonsInArena", Value: 0 },
    { ActualName: "Cfg.TargetProperties.StandingMaxHeight", Value: 0 },
    { ActualName: "Cfg.TargetProperties.StandingMinHeight", Value: 0 },
    { ActualName: "Cfg.TargetProperties.SittingMinHeight", Value: 0 },
    { ActualName: "Cfg.TargetProperties.LyingMinHeight", Value: 0 },
    { ActualName: "Cfg.TargetProperties.PersonRadius", Value: 0 },
  ],
};

const VariablesReducer = (state, action) => {
  switch(action.type) {
    case "PARAMS:UPDATE_PARAM":
      return state.map(p => {
        return p.ActualName === action.value.ActualName ? action.value : p
      });
    default:
      return state;
  }
};

const defaultParamsState = {
  displayParams: defaultParams,
  defaultParams: defaultParams,
};
  
const ParamsReducer = (state = defaultParamsState, action) => {
  switch (action.type) {
    case "PARAMS:UPDATE_DISPLAY":
      return { ...state, displayParams: action.value };
    case "PARAMS:UPDATE_DEFAULTS":
      return { ...state, defaultParams: action.value };
    case "PARAMS:APPLY_DEFAULTS":
      return { ...state, displayParams: state.defaultParams, };
    case "PARAMS:UPDATE_PARAM":
      return {
        ...state,
        displayParams: {
          variables: VariablesReducer(state.displayParams.variables, action),
          ID: "UpdateConfigurationEditor",
        },
      };
    case "WEBSOCKET:MESSAGE":
      if (action.payload.data.ID === "UpdateConfigurationEditor") {
        return {
          ...state,
          defaultParams: action.payload.data,
          displayParams: action.payload.data
        };
      } else {
        return state;
      }
    default:
      return state;
  }
};

export default ParamsReducer;
