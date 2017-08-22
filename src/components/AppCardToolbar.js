import React from 'react';
import { connect } from 'react-redux';
import * as displayActions from '../actions/actions-display';

import Toolbar from 'material-ui/Toolbar';
import Menu from 'material-ui/Menu';
import Checkbox from 'material-ui/Checkbox';
import { ListItem, ListItemSecondaryAction, ListItemText, ListItemIcon } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import LayersIcon from 'material-ui-icons/Layers';
import RotateRightIcon from 'material-ui-icons/RotateRight';
import FlipIcon from 'material-ui-icons/Flip';
import GridOnIcon from 'material-ui-icons/GridOn';
import PersonPinCircleIcon from 'material-ui-icons/PersonPinCircle';
import DirectionsRunIcon from 'material-ui-icons/DirectionsRun';
import LocationSearchingIcon from 'material-ui-icons/LocationSearching';
import LandscapeIcon from 'material-ui-icons/Landscape';


const styles = {
  menu: {
    width: 225,
  },
  listItem: {
    outline: 'none',
  },
  imgIcon: {
    borderRadius: 0,
    height: 30, width: 30,
  },
};

const AppCard = ({index, card, dispatches}) => (
  <Toolbar>
    <IconButton
      onClick={ e => dispatches.toggleCardLayersMenu(e.currentTarget) }
      ><LayersIcon />
    </IconButton>
    <Menu
      anchorEl={ card.menuBtnElem }
      open={ card.isMenuOpen }
      onRequestClose={ dispatches.toggleCardLayersMenu }
      style={ styles.menu }
    >
      <ListItem dense style={ styles.listItem }>
      <ListItemIcon><GridOnIcon /></ListItemIcon>
        <ListItemText primary="Heatmap" />
        <ListItemSecondaryAction>
          <Checkbox
            checked={ card.layers.isHeatmap }
            onClick={ () => dispatches.updateCardLayers("Heatmap") }
          />
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem dense style={ styles.listItem }>
        <ListItemIcon><PersonPinCircleIcon /></ListItemIcon>
        <ListItemText primary="Targets" />
        <ListItemSecondaryAction>
          <Checkbox
            checked={ card.layers.isTargets }
            onClick={ () => dispatches.updateCardLayers("Targets") }
          />
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem dense style={ styles.listItem }>
        <ListItemIcon><DirectionsRunIcon /></ListItemIcon>
        <ListItemText primary="Posture" />
        <ListItemSecondaryAction>
          <Checkbox
            checked={ card.layers.isPosture }
            onClick={ () => dispatches.updateCardLayers("Posture") }
          />
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem dense style={ styles.listItem }>
        <ListItemIcon><LocationSearchingIcon /></ListItemIcon>
        <ListItemText primary="Sensor" />
        <ListItemSecondaryAction>
          <Checkbox
            checked={ card.layers.isSensor }
            onClick={ () => dispatches.updateCardLayers("Sensor") }
          />
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
      <ListItem dense style={ styles.listItem }>
      <ListItemIcon><LandscapeIcon /></ListItemIcon>
        <ListItemText primary="3D View" />
        <ListItemSecondaryAction>
          <Checkbox
            checked={ card.layers.is3D }
            onClick={ () => dispatches.updateCardLayers("3D") }
          />
        </ListItemSecondaryAction>
      </ListItem>
    </Menu>
    <IconButton
      onClick={ dispatches.rotateCard90Deg }
      ><RotateRightIcon />
    </IconButton>
    <IconButton
      onClick={ dispatches.toggleCardReflection }
      ><FlipIcon />
    </IconButton>
  </Toolbar>
);

const mapDispatchToProps = (dispatch, ownProps) => ({ dispatches: {
  updateCardLayers(value) {
    dispatch(displayActions.updateCardLayers(ownProps.index, value));
  },
  rotateCard90Deg() {
    dispatch(displayActions.rotateCard90Deg(ownProps.index));
  },
  toggleCardReflection() {
    dispatch(displayActions.toggleCardReflection(ownProps.index));
  },
  toggleCardLayersMenu(value) {
    dispatch(displayActions.toggleCardLayersMenu(ownProps.index, value));
  },
}});

const mapStateToProps = (state, { index }) => ({
  index: index,
  card: state.display.cards[index],
});

export default connect(mapStateToProps, mapDispatchToProps)(AppCard);
