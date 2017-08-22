import React, { Component } from 'react';
import { connect } from 'react-redux';
import { websocketConnect, websocketDisconnect, websocketSend } from '../actions/actions-websocket';
import { toggleDrawer, toggleCard } from '../actions/actions-display';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Input from 'material-ui/Input/Input';
import Switch from 'material-ui/Switch';


const styles =  {
  menuButton: {
    marginRight: 20,
  },
  input: {
    margin: 10, paddingLeft: 10, paddingRight: 10,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    color: "white",
    borderRadius: 2,
  },
  typography: {
    flex: 1,
    paddingLeft: 40,
    paddingRight: 40,
  }
};

class AppHeader extends Component {

  state = {
    inputURL: this.props.websocket.url,
  }

  handleConnectBtn() {
    if (this.props.websocket.status !== "Connected") {
      this.props.websocketConnect(this.state.inputURL);
    } else {
      this.props.websocketDisconnect();
    }
  }
  
  handleStartBtn() {
    if (this.props.websocket.status === "Connected") {
      this.props.websocketSend({ ID: "GenericCommand", CommandType: "Start" });
    }
  }

  render() {
    return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          color="contrast"
          style={ styles.menuButton }
          onClick={ this.props.toggleDrawer }
        ><MenuIcon />
        </IconButton>
        <Input
          style={ styles.input }
          disableUnderline={ true }
          onChange={ event => this.setState({ inputURL: event.target.value }) }
          value={ this.state.inputURL }
        />
        <Button
          color="contrast"
          style={{ width: 120 }}
          onClick={ this.handleConnectBtn.bind(this) }
          >{ this.props.websocket.status === "Disconnected" ? "Connect" : "Disconnect" }
        </Button>
        <Button
          color="contrast"
          style={{ width: 80 }}
          onClick={ this.handleStartBtn.bind(this) }
          >{ "Start" }
        </Button>
        <Typography type="button" color="inherit" style={ styles.typography }>
          { "STATUS: " + this.props.websocket.status }
        </Typography>
        <Switch
          checked={ this.props.display.cards[1].isMount }
          onChange={ (_, isChecked) => this.props.toggleCard() }
        />
      </Toolbar>
    </AppBar>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  websocketConnect(url) {
    dispatch(websocketConnect(url));
  },
  websocketDisconnect() {
    dispatch(websocketDisconnect());
  },
  websocketSend(msg) {
    dispatch(websocketSend(msg));
  },
  toggleDrawer() {
    dispatch(toggleDrawer());
  },
  toggleCard() {
    dispatch(toggleCard(1));
  },
});
  
const mapStateToProps = (state) => ({
  display: state.display,
  websocket: state.websocket,
});

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
