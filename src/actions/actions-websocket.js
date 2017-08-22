export const websocketConnect = (url, callback) => ({
  type: "WEBSOCKET:CONNECT",
  payload: { url: url, callback: callback }
});

export const websocketDisconnect = () => ({
  type: "WEBSOCKET:DISCONNECT"
});

export const websocketSend = (msg) => ({
  type: "WEBSOCKET:SEND",
  payload: msg,
});
