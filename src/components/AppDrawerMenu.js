import React from 'react';
import { connect } from 'react-redux';
import * as displayActions from '../actions/actions-display';

import List, {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Switch from 'material-ui/Switch';
import FileUploadIcon from 'material-ui-icons/FileUpload';
import DeveloperBoardIcon from 'material-ui-icons/DeveloperBoard';
import SaveIcon from 'material-ui-icons/Save';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';


const styles = {
  list: {
    width: '100%',
    maxWidth: 350,
    flex: 'initial',
  },
  arenaTextfield: {
    marginLeft: 10,
    marginRight: 10,
  }
};

const AppDrawerMenu = ({drawer, dispatches}) => (
  <div>
    <List
      subheader={ <ListSubheader>Main Settings</ListSubheader> }
      style={ styles.list }
    >
      <ListItem>
        <ListItemIcon><DeveloperBoardIcon /></ListItemIcon>
        <ListItemText
          primary="Device Type"
          secondary="Of Vayyar sensors"
        />
        <ListItemSecondaryAction>
          <Button
            style={{ textTransform: 'none' }}
            onClick={ e => dispatches.toggleDrawerDeviceMenu(e.currentTarget) }>
            vCube
          </Button>
          <Menu
            anchorEl={ drawer.deviceMenuBtnElem }
            open={ drawer.isDeviceMenuOpen }
            onRequestClose={ dispatches.toggleDrawerDeviceMenu }
          >
            <MenuItem onClick={ dispatches.toggleDrawerDeviceMenu }>vCube</MenuItem>
            <MenuItem onClick={ dispatches.toggleDrawerDeviceMenu }>Vex</MenuItem>
          </Menu>
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem>
        <ListItemIcon><FileUploadIcon /></ListItemIcon>
        <ListItemText
          primary="Load Recording"
          secondary="Recording location is hardcoded"
        />
        <ListItemSecondaryAction>
          <Switch />
        </ListItemSecondaryAction>
      </ListItem>
    </List>
    <Divider />
    <List
      subheader={ <ListSubheader>Arena</ListSubheader> }
      style={ styles.list }
    >
      <ListItem>
        <TextField
          label="X Min Value" margin="none"
          style={ styles.arenaTextfield }
        />
        <TextField
          label="X Max Value" margin="none"
          style={ styles.arenaTextfield }
        />
      </ListItem>
      <ListItem>
        <TextField
          label="Y Min Value" margin="none"
          style={ styles.arenaTextfield }
        />
        <TextField
          label="Y Max Value" margin="none"
          style={ styles.arenaTextfield }
        />
      </ListItem>
      <ListItem>
        <TextField
          label="Z Min Value" margin="none"
          style={ styles.arenaTextfield }
        />
        <TextField
          label="Z Max Value" margin="none"
          style={ styles.arenaTextfield }
        />
      </ListItem>
    </List>
    <Divider />
    <List
      subheader={ <ListSubheader>Recording</ListSubheader> }
      style={ styles.list }
    >
      <ListItem>
        <ListItemIcon><SaveIcon /></ListItemIcon>
        <ListItemText
          primary="Save Image To File"
          secondary="A discription of 'image'"
        />
        <ListItemSecondaryAction>
          <Switch />
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem>
        <ListItemIcon><SaveIcon /></ListItemIcon>
        <ListItemText
          primary="Save Raw Data To File"
          secondary="A discription of 'raw data'"
        />
        <ListItemSecondaryAction>
          <Switch />
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem>
        <ListItemIcon><SaveIcon /></ListItemIcon>
        <ListItemText
          primary="Save Calibrated Data To File"
          secondary="A discription of 'calibrated data'"
        />
        <ListItemSecondaryAction>
          <Switch />
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  </div>
)

const mapDispatchToProps = (dispatch) => ({ dispatches: {
  toggleDrawerDeviceMenu(value) {
    dispatch(displayActions.toggleDrawerDeviceMenu(value));
  },
}});
  
const mapStateToProps = (state) => ({
  drawer: state.display.drawer,
});

export default connect(mapStateToProps, mapDispatchToProps)(AppDrawerMenu);
