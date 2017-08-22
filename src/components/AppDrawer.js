import React from 'react';
import { connect } from 'react-redux';
import { toggleDrawer } from '../actions/actions-display';

import Drawer from 'material-ui/Drawer';

import AppDrawerMenuUI from './AppDrawerMenu';


const AppDrawer = ({display, toggleDrawer}) => (
  <Drawer
    open={ display.drawer.isOpen }
    onRequestClose={ () => toggleDrawer(false) }
  >
  <AppDrawerMenuUI />
  </Drawer>
);

const mapDispatchToProps = (dispatch) => ({
	toggleDrawer(value) {
		dispatch(toggleDrawer(value))
	}
});
  
const mapStateToProps = (state) => ({
	display: state.display,
});

export default connect(mapStateToProps, mapDispatchToProps)(AppDrawer);
