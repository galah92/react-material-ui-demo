import { compose } from 'redux';
import partial from 'lodash/fp/partial';

import { websocketSend } from '../actions/actions-websocket';


const createMiddleware = () => {

  return (store) => (next) => (action) => {
    const returnStore = next(action);
    switch (action.type) {
      case "WEBSOCKET:OPEN":
        returnStore.dispatch(websocketSend(returnStore.params.deafultParams));
        break;
      case "WEBSOCKET:MESSAGE":
        const payload = JSON.parse(action.payload.data);
        if (store.params.displayParams.includes(payload.ID)) {
          returnStore.dispatch(websocketSend({ID: payload.ID}));
        };
        break;
    }
  };
  
};

export default createMiddleware();
