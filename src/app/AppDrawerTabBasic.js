import React from 'react';
import { connect } from 'react-redux';
import * as paramsActions from '../actions/actions-params';

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
import TextField from 'material-ui/TextField';


const styles = {
  list: {
    width: '100%',
    maxWidth: 350,
  },
  arenaTextfield: {
    marginLeft: 5,
    marginRight: 5,
  }
};

const getParam = (arr, name) => arr.filter(obj => obj.ActualName === name)[0];

const AppDrawerTabBasic = (props) => (
  <div>
    <List
      subheader={ <ListSubheader>Main Settings</ListSubheader> }
      style={ styles.list }
    >
      <ListItem>
        <ListItemIcon><FileUploadIcon /></ListItemIcon>
        <ListItemText
          primary="Load Recording"
          secondary="Recording location is hardcoded"
        />
        <ListItemSecondaryAction>
          <Switch
            disabled={ props.disabled }
            checked={ getParam(props.params, "MPR.read_from_file").Value === 1 }
            onChange={ (_, isChecked) => props.updateParam({
              ActualName: "MPR.read_from_file",
              Value: getParam(props.params, "MPR.read_from_file").Value === 1 ? 0 : 1,
            }) }
          />
        </ListItemSecondaryAction>
      </ListItem>
    </List>
    <Divider />
    <List
      subheader={ <ListSubheader>Room Dimentions</ListSubheader> }
      style={ styles.list }
    >
      <ListItem>
        <TextField
          disabled={ props.disabled }
          label="X Min" helperText="Some important helper text"
          fullWidth style={ styles.arenaTextfield }
          value={ getParam(props.params, "Cfg.MonitoredRoomDims").Value[0] }
          onChange={ e => props.updateParam({
              ActualName: "Cfg.MonitoredRoomDims",
              Value: getParam(props.params, "Cfg.MonitoredRoomDims").map((x, i) => i === 0 ? Number(e.target.value) : x),
            }) }
        />
        <TextField
          disabled={ props.disabled }
          label="X Max" helperText="Some important helper text"
          fullWidth style={ styles.arenaTextfield }
          value={ getParam(props.params, "Cfg.MonitoredRoomDims").Value[1] }
          onChange={ e => props.updateParam({
              ActualName: "Cfg.MonitoredRoomDims",
              Value: getParam(props.params, "Cfg.MonitoredRoomDims").map((x, i) => i === 0 ? Number(e.target.value) : x),
            }) }
        />
      </ListItem>
      <ListItem>
        <TextField
          disabled={ props.disabled }
          label="Y Min" helperText="Some important helper text"
          fullWidth style={ styles.arenaTextfield }
          value={ getParam(props.params, "Cfg.MonitoredRoomDims").Value[2] }
          onChange={ e => props.updateParam({
              ActualName: "Cfg.MonitoredRoomDims",
              Value: getParam(props.params, "Cfg.MonitoredRoomDims").map((x, i) => i === 0 ? Number(e.target.value) : x),
            }) }
        />
        <TextField
          disabled={ props.disabled }
          label="Y Max" helperText="Some important helper text"
          fullWidth style={ styles.arenaTextfield }
          value={ getParam(props.params, "Cfg.MonitoredRoomDims").Value[3] }
          onChange={ e => props.updateParam({
              ActualName: "Cfg.MonitoredRoomDims",
              Value: getParam(props.params, "Cfg.MonitoredRoomDims").map((x, i) => i === 0 ? Number(e.target.value) : x),
            }) }
        />
      </ListItem>
      <ListItem>
        <TextField
          disabled={ props.disabled }
          label="Z Min" helperText="Some important helper text"
          fullWidth style={ styles.arenaTextfield }
          value={ getParam(props.params, "Cfg.MonitoredRoomDims").Value[4] }
          onChange={ e => props.updateParam({
              ActualName: "Cfg.MonitoredRoomDims",
              Value: getParam(props.params, "Cfg.MonitoredRoomDims").map((x, i) => i === 0 ? Number(e.target.value) : x),
            }) }
        />
        <TextField
          disabled={ props.disabled }
          label="Z Max" helperText="Some important helper text"
          fullWidth style={ styles.arenaTextfield }
          value={ getParam(props.params, "Cfg.MonitoredRoomDims").Value[5] }
          onChange={ e => props.updateParam({
              ActualName: "Cfg.MonitoredRoomDims",
              Value: getParam(props.params, "Cfg.MonitoredRoomDims").map((x, i) => i === 0 ? Number(e.target.value) : x),
            }) }
        />
      </ListItem>
    </List>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  updateParam(value) {
    dispatch(paramsActions.updateParam(value));
  },
});
  
const mapStateToProps = (state, ownProps) => ({
  params: state.params.displayParams.variables,
  disabled: ownProps.disabled,
});

export default connect(mapStateToProps, mapDispatchToProps)(AppDrawerTabBasic);
