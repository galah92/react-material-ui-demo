// known phases by order:
// Disconnected, Connecting, Connected
// RequestedParams, GotParams,
// Running, Stopped

const defaultBackendState = {
  phase: "Disconnected",
  websocket: {
    status: "Disconnected",
    url: "ws://127.0.0.1:1234/",
  }
};

const WebsocketReducer = (state, action) => {
  switch (action.type) {
    case "CONN_MANAGER:UPDATE_URL":
      return { ...state, url: action.value }
    case "WEBSOCKET:CONNECT":
      return { ...state, status: "Connecting", url: action.payload.url }
    case "WEBSOCKET:OPEN":
      return { ...state, status: "Connected" }
    case "WEBSOCKET:CLOSED":
      return { ...state, status: "Disconnected" }
    default:
      return state;
  }
};

const BackendReducer = (state = defaultBackendState, action) => {
  switch (action.type) {
  case "CONN_MANAGER:UPDATE_URL":
    return { ...state, websocket: WebsocketReducer(state.websocket, action) }
  case "WEBSOCKET:CONNECT":
    return { ...state, phase: "Connecting", websocket: WebsocketReducer(state.websocket, action) };
  case "WEBSOCKET:OPEN":
    return { ...state, phase: "Connected", websocket: WebsocketReducer(state.websocket, action) };
  case "WEBSOCKET:CLOSED":
    return { ...state, phase: "Disconnected", websocket: WebsocketReducer(state.websocket, action) };
  case "WEBSOCKET:SEND":
    if (action.payload.ID === "UpdateConfigurationEditor"
        && action.payload.variables[0].Value === "NA") {
      return { ...state, phase: "RequestedParams" };
    } else if (action.payload.ID === "GenericCommand"
        && action.payload.CommandType === "Start") {
      return { ...state, phase: "Running" };
    } else if (action.payload.ID === "GenericCommand"
        && action.payload.CommandType === "Stop") {
      return { ...state, phase: "Stopped" };
    } else {
      return state;
    }
  case "WEBSOCKET:MESSAGE":
    if (action.payload.data.ID === "UpdateConfigurationEditor") {
      return { ...state, phase: "GotParams" };
    } else {
      return state;
    }
  default:
    return state;
  }
};

export default BackendReducer;
