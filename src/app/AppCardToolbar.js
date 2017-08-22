import React, { Component } from 'react';
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
import RotateLeftIcon from 'material-ui-icons/RotateLeft';
import FlipIcon from 'material-ui-icons/Flip';
import GridOnIcon from 'material-ui-icons/GridOn';
import PersonPinCircleIcon from 'material-ui-icons/PersonPinCircle';
import DirectionsRunIcon from 'material-ui-icons/DirectionsRun';
import LocationSearchingIcon from 'material-ui-icons/LocationSearching';
import LandscapeIcon from 'material-ui-icons/Landscape';


const styles = {
  menu: {
    width: 275,
  },
  listItem: {
    outline: 'none',
  },
  imgIcon: {
    borderRadius: 0,
    height: 30, width: 30,
  },
};

class AppCard extends Component {

  state = {
    anchorEl: undefined,
    isMenuOpen: false,
  };

  render() {
    return (
      <Toolbar>
        <IconButton
          onClick={ e => this.setState({ isMenuOpen: true, anchorEl: e.currentTarget }) }
          ><LayersIcon />
        </IconButton>
        <Menu
          anchorEl={ this.state.anchorEl }
          open={ this.state.isMenuOpen }
          onRequestClose={ () => this.setState({ isMenuOpen: false }) }
          style={ styles.menu }
        >
          <ListItem dense style={ styles.listItem }>
            <ListItemIcon><GridOnIcon /></ListItemIcon>
            <ListItemText primary="Heatmap (Contour)" />
            <ListItemSecondaryAction>
              <Checkbox
                checked={ this.props.card.layers.isHeatmap1 }
                onClick={ () => this.props.updateCardLayers("Heatmap1") }
              />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem dense style={ styles.listItem }>
            <ListItemIcon><GridOnIcon /></ListItemIcon>
            <ListItemText primary="Heatmap (Pixelated)" />
            <ListItemSecondaryAction>
              <Checkbox
                checked={ this.props.card.layers.isHeatmap2 }
                onClick={ () => this.props.updateCardLayers("Heatmap2") }
              />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem dense style={ styles.listItem }>
            <ListItemIcon><GridOnIcon /></ListItemIcon>
            <ListItemText primary="Heatmap (Deprecated)" />
            <ListItemSecondaryAction>
              <Checkbox disabled
                checked={ this.props.card.layers.isHeatmap3 }
                onClick={ () => this.props.updateCardLayers("Heatmap3") }
              />
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
          <ListItem dense style={ styles.listItem }>
            <ListItemIcon><PersonPinCircleIcon /></ListItemIcon>
            <ListItemText primary="Targets" />
            <ListItemSecondaryAction>
              <Checkbox
                checked={ this.props.card.layers.isTargets }
                onClick={ () => this.props.updateCardLayers("Targets") }
              />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem dense style={ styles.listItem }>
            <ListItemIcon><DirectionsRunIcon /></ListItemIcon>
            <ListItemText primary="Posture" />
            <ListItemSecondaryAction>
              <Checkbox
                checked={ this.props.card.layers.isPosture }
                onClick={ () => this.props.updateCardLayers("Posture") }
              />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem dense style={ styles.listItem }>
            <ListItemIcon><LocationSearchingIcon /></ListItemIcon>
            <ListItemText primary="Sensor" />
            <ListItemSecondaryAction>
              <Checkbox
                checked={ this.props.card.layers.isSensor }
                onClick={ () => this.props.updateCardLayers("Sensor") }
              />
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
          <ListItem dense style={ styles.listItem }>
            <ListItemIcon><LandscapeIcon /></ListItemIcon>
            <ListItemText primary="3D View" />
            <ListItemSecondaryAction>
              <Checkbox
                checked={ this.props.card.layers.is3D }
                onClick={ () => this.props.updateCardLayers("3D") }
              />
            </ListItemSecondaryAction>
          </ListItem>
        </Menu>
        <IconButton
          onClick={ this.props.rotateCard90DegLeft }
          ><RotateLeftIcon />
        </IconButton>
        <IconButton
          onClick={ this.props.rotateCard90DegRight }
          ><RotateRightIcon />
        </IconButton>
        <IconButton
          onClick={ this.props.toggleCardReflection }
          ><FlipIcon />
        </IconButton>
      </Toolbar>
    );
  }

}

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateCardLayers(value) {
    dispatch(displayActions.updateCardLayers(ownProps.index, value));
  },
  rotateCard90DegLeft() {
    dispatch(displayActions.rotateCard90DegLeft(ownProps.index));
  },
  rotateCard90DegRight() {
    dispatch(displayActions.rotateCard90DegRight(ownProps.index));
  },
  toggleCardReflection() {
    dispatch(displayActions.toggleCardReflection(ownProps.index));
  },
});

const mapStateToProps = (state, { index }) => ({
  index: index,
  card: state.display.cards[index],
});

export default connect(mapStateToProps, mapDispatchToProps)(AppCard);
