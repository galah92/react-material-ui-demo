import React from 'react';
import { connect } from 'react-redux';
import * as paramsActions from '../actions/actions-params';

import List, { ListItem, ListSubheader } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';

import SelectedMenuListItem from './SelectedMenuListItem';


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

const AppDrawerTabAdvanced = (props) => (
  <div>
    <List
      subheader={ <ListSubheader>Image Processing</ListSubheader> }
      style={ styles.list }
    >
      <SelectedMenuListItem
        label="Substraction Mode"
        options={ ['No Substraction', 'Background Signal Level', 'Background Image Level', 'MTI', 'combineMTI'] }
        disabled={ props.disabled }
        value={ getParam(props.params, "Cfg.imgProcessing.substractionMode").Value }
        onClick={ index => props.updateParam({
            ActualName: "Cfg.imgProcessing.substractionMode",
            Value: index,
          }) }
      />
    </List>
    <Divider />
    <List
      subheader={ <ListSubheader>Target Properties</ListSubheader> }
      style={ styles.list }
    >
      <ListItem>
        <TextField type="number"
          label="MaxPersonsInArena" helperText="Some important helper text"
          fullWidth style={ styles.arenaTextfield }
          disabled={ props.disabled }
          value={ getParam(props.params, "Cfg.TargetProperties.MaxPersonsInArena").Value }
          onChange={ e => props.updateParam({
            ActualName: "Cfg.TargetProperties.MaxPersonsInArena",
            Value: Number(e.target.value),
          }) }
        />
        <TextField type="number"
          label="PersonRadius" helperText="Some important helper text"
          fullWidth style={ styles.arenaTextfield }
          disabled={ props.disabled }
          value={ getParam(props.params, "Cfg.TargetProperties.PersonRadius").Value }
          onChange={ e => props.updateParam({
            ActualName: "Cfg.TargetProperties.PersonRadius",
            Value: Number(e.target.value),
          }) }
        />
      </ListItem>
      <ListItem>
        <TextField type="number"
          label="StandingMaxHeight" helperText="Some important helper text"
          fullWidth style={ styles.arenaTextfield }
          disabled={ props.disabled }
          value={ getParam(props.params, "Cfg.TargetProperties.StandingMaxHeight").Value }
          onChange={ e => props.updateParam({
            ActualName: "Cfg.TargetProperties.StandingMaxHeight",
            Value: Number(e.target.value),
          }) }
        />
        <TextField type="number"
          label="StandingMinHeight" helperText="Some important helper text"
          fullWidth style={ styles.arenaTextfield }
          disabled={ props.disabled }
          value={ getParam(props.params, "Cfg.TargetProperties.StandingMinHeight").Value }
          onChange={ e => props.updateParam({
            ActualName: "Cfg.TargetProperties.StandingMinHeight",
            Value: Number(e.target.value),
          }) }
        />
      </ListItem>
      <ListItem>
        <TextField type="number"
          label="SittingMinHeight" helperText="Some important helper text"
          fullWidth style={ styles.arenaTextfield }
          disabled={ props.disabled }
          value={ getParam(props.params, "Cfg.TargetProperties.SittingMinHeight").Value }
          onChange={ e => props.updateParam({
            ActualName: "Cfg.TargetProperties.SittingMinHeight",
            Value: Number(e.target.value),
          }) }
        />
        <TextField type="number"
          label="LyingMinHeight" helperText="Some important helper text"
          fullWidth style={ styles.arenaTextfield }
          disabled={ props.disabled }
          value={ getParam(props.params, "Cfg.TargetProperties.LyingMinHeight").Value }
          onChange={ e => props.updateParam({
            ActualName: "Cfg.TargetProperties.LyingMinHeight",
            Value: Number(e.target.value),
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

export default connect(mapStateToProps, mapDispatchToProps)(AppDrawerTabAdvanced);
