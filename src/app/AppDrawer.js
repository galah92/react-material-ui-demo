import React from 'react';
import { connect } from 'react-redux';
import * as displayActions from '../actions/actions-display';

import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';

import AppDrawerTabBasic from './AppDrawerTabBasic';
import AppDrawerTabAdvanced from './AppDrawerTabAdvanced';


const styles = {
  appBar: {
    width: 350,
  }
};

const AppDrawer = (props) => (
  <Drawer
    open={ props.drawer.isOpen }
    onRequestClose={ props.toggleDrawer }
  >
    <AppBar position="static" style={ styles.appBar }>
      <Tabs
        value={ props.drawer.tabNumber }
        onChange={ (_, value) => props.switchTab(value) }
        fullWidth
      >
        <Tab label="Basic" />
        <Tab label="Advanced" />
      </Tabs>
    </AppBar>
    <div style={{ marginTop: 15 }}>
      {
        props.drawer.tabNumber === 0 &&
        <AppDrawerTabBasic disabled={ props.disabled } />
      }
      {
        props.drawer.tabNumber === 1 &&
        <AppDrawerTabAdvanced disabled={ props.disabled } />
      }
    </div>
  </Drawer>
);

const mapDispatchToProps = (dispatch) => ({
	toggleDrawer(value) {
		dispatch(displayActions.toggleDrawer(value))
  },
  switchTab(value) {
		dispatch(displayActions.switchTabInDrawer(value))
	},
});
  
const mapStateToProps = (state) => ({
  drawer: state.display.drawer,
  phase: state.backend.phase,
  disabled: !["GotParams", "Stopped"].includes(state.backend.phase),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppDrawer);
