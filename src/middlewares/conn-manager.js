import { connect, disconnect, send } from './websocket';
import { defaultParams } from '../reducers/reducer-params';


const getParamsCommand = {
  ID: "UpdateConfigurationEditor",
  variables: defaultParams.variables.map(param => ({
    ActualName: param.ActualName,
    Value: "NA"
  })),
};

const setOutputsCommand = {
  ID: "UpdateConfigurationEditor",
  variables: [
    { "ActualName":"Cfg.ExternalGUI.OutputTypes{end + 1}", "Value":"Tracker_Update" },
    { "ActualName":"Cfg.ExternalGUI.OutputTypes{end + 1}", "Value":"sliceBot" },
    { "ActualName":"Cfg.ExternalGUI.OutputTypes{end + 1}", "Value":"surfaceImage" },
  ],
};

const outputTypes = setOutputsCommand.variables.map(x => x.Value);

const connManager = store => next => action => {
  next(action);
  const state = store.getState();
  switch (action.type) {
    case "CONN_MANAGER:CONN_BTN":
      if (state.backend.websocket.status !== "Connected") {
        store.dispatch(connect(state.backend.websocket.url));
      } else {
        store.dispatch(disconnect());
      }
      break;
    case "WEBSOCKET:OPEN":
      store.dispatch(send(getParamsCommand));
      store.dispatch(send(setOutputsCommand));
      break;
    case "CONN_MANAGER:START_BTN":
      if (state.backend.phase !== "Running") {
        store.dispatch(send(state.params.displayParams));
        store.dispatch(send({ ID: "GenericCommand", CommandType: "Start" }));
        for (let outputType of outputTypes) {
          store.dispatch(send({ ID: outputType }));
        }
        if (outputTypes.includes("Tracker_Update")) {  // a tracker msg patch
          store.dispatch(send({ ID: "Tracker_Init" }));
        }
      } else {
        store.dispatch(send({ ID: "GenericCommand", CommandType: "Stop" }));
      }
      break;
    case "WEBSOCKET:MESSAGE":
      if (outputTypes.includes(action.payload.data.ID)) {
        store.dispatch(send({ ID: action.payload.data.ID }));
      } else if (action.payload.data.ID === "Generic2DMatrix") {
        store.dispatch(send({ ID: action.payload.data.DataType }));
      }
      break;
    default:
  }
};

export default connManager;
