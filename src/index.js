import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import createPalette from 'material-ui/styles/palette';
import blue from 'material-ui/colors/blue';
import amber from 'material-ui/colors/amber';

import display from './reducers/reducer-display'
import params from './reducers/reducer-params';
import data from './reducers/reducer-data';
import backend from './reducers/reducer-backend';

import websocketMiddleware from './middlewares/websocket';
import connMngrMiddleware from './middlewares/conn-manager';

import App from './app/App';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({display, params, data, backend,}),
  composeEnhancers(applyMiddleware(connMngrMiddleware, websocketMiddleware)),
);

const theme = createMuiTheme({
  palette: createPalette({
    primary: blue,
    accent: amber,
  }),
});

ReactDOM.render(
  <Provider store={ store }>
    <MuiThemeProvider theme={ theme }>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
