import { compose } from 'redux';
import partial from 'lodash/fp/partial';


export const connect =  (url) => ({
  type: "WEBSOCKET:CONNECT",
  payload: { url: url }
});

export const disconnect = () => ({
  type: "WEBSOCKET:DISCONNECT"
});

export const send = (msg) => ({
  type: "WEBSOCKET:SEND",
  payload: msg,
});

const open = (event) => ({
  type: "WEBSOCKET:OPEN",
  payload: {
    timestamp: new Date(),
    event
  }
});

const closed = (event) => ({
  type: "WEBSOCKET:CLOSED",
  payload: {
    timestamp: new Date(),
    event
  }
});

const message = (event) => ({
  type: "WEBSOCKET:MESSAGE",
  payload: {
    timestamp: new Date(),
    data: JSON.parse(event.data),
    event
  }
});

const createMiddleware = () => {
  
  let websocket;
  
  const initialize = ({ dispatch }, config) => {
    websocket = new WebSocket(...[config.url]);
    const dispatchAction = partial(compose, [dispatch]);
    websocket.onopen = dispatchAction(open);
    websocket.onclose = dispatchAction(closed);
    websocket.onmessage = dispatchAction(message);
  };

  const close = () => {
    if (websocket) {
      websocket.close();
      websocket = null;
    }
  };

  return (store) => (next) => (action) => {  //  The primary Redux middleware function.
    switch (action.type) {
      case "WEBSOCKET:CONNECT":
        close();
        initialize(store, action.payload);
        next(action);
        break;
      case "WEBSOCKET:DISCONNECT":
        close();
        next(action);
        break;
      case "WEBSOCKET:SEND":
        if (websocket) {
          websocket.send(JSON.stringify(action.payload));
        } else {
          console.warn('WebSocket is closed, ignoring. Trigger a WEBSOCKET_CONNECT first.');
        }
        next(action);
        break;
      default:
        next(action);
    }
  };
};

export default createMiddleware();
