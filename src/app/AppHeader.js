import React from 'react';
import { connect } from 'react-redux';
import * as displayActions from '../actions/actions-display';
import * as connMngrActions from '../actions/actions-conn-manager';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Input from 'material-ui/Input/Input';
import Switch from 'material-ui/Switch';
import { LinearProgress } from 'material-ui/Progress';


const connBtnText = {
  Disconnected: "Connect",
  Connecting: "Connecting",
  Connected: "Disconnect",
};

const styles =  {
  menuButton: {
    marginRight: 20,
    color: "inherit",
  },
  input: {
    margin: 10, paddingLeft: 10, paddingRight: 10,
    backgroundColor: "rgba(255, 255, 255, 0.10)",
    color: "inherit",
    fontWeight: 500,
    borderRadius: 2,
  },
  progressContainer: {
    flex: 1,
    marginLeft: 100,
    marginRight: 100,
  },
  progress: {
    width: '100%',
  },
};

const AppHeader = (props) => (
  <AppBar position="static" color="primary">
    <Toolbar>
      <IconButton
        style={ styles.menuButton }
        onClick={ props.toggleDrawer }
      ><MenuIcon />
      </IconButton>
      <Input
        style={ styles.input }
        disableUnderline={ true }
        onChange={ e => props.connManagerUpdateURL(e.target.value) }
        value={ props.websocket.url }
      />
      <Button
        color="contrast" style={{ width: 120 }}
        onClick={ props.handleConnBtn }
      >{ connBtnText[props.websocket.status] }
      </Button>
      <Button
        color="contrast" style={{ width: 80 }}
        onClick={ props.handleStartBtn }
        disabled={ !["GotParams", "Running", "Stopped"].includes(props.phase) }
      >{ props.phase === "Running" ? "Stop" : "Start" }
      </Button>
      <div style={ styles.progressContainer }>
        {
          (props.phase === "Connecting" || props.phase === "RequestedParams") &&
          <LinearProgress mode="query" color="primary" style={ styles.progress } />
        }
      </div>
      <Switch style={{ color: "white" }}
        checked={ props.display.cards[1].isMount }
        onChange={ props.toggleCard }
      />
    </Toolbar>
  </AppBar>
);

const mapDispatchToProps = (dispatch) => ({
  connManagerUpdateURL(url) {
    dispatch(connMngrActions.connManagerUpdateURL(url));
  },
  handleConnBtn() {
    dispatch(connMngrActions.connManagerHandleConnBtn());
  },
  handleStartBtn() {
    dispatch(connMngrActions.connManagerHandleStartBtn());
  },
  toggleDrawer() {
    dispatch(displayActions.toggleDrawer());
  },
  toggleCard() {
    dispatch(displayActions.toggleCard(1));
  },
});
  
const mapStateToProps = (state) => ({
  display: state.display,
  websocket: state.backend.websocket,
  phase: state.backend.phase,
});

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
