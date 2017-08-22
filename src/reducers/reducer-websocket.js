const defaultWebsocketState = {
  status: "Disconnected",
  url: "ws://127.0.0.1:1234/",
}

const WebsocketReducer = (state = defaultWebsocketState, action) => {
  switch (action.type) {
    case "WEBSOCKET:CONNECT":
      return { ...state, status: "Connecting", url: action.payload.url }
    case "WEBSOCKET:OPEN":
      return { ...state, status: "Connected" }
    case "WEBSOCKET:CLOSED":
      return { ...state, status: "Disconnected" }
    default:
      return state;
  }
}

export default WebsocketReducer;
