import React from 'react';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';

import AppCardToolbar from './AppCardToolbar';
// import Heatmap from '../layers/Heatmap';


const styles = {
  paper: {
    height: '100%',
  },
  contentContainerDiv: {
    height: 'calc(100% - 64px)',
    position: 'relative'
  },
  layerContainerDiv: {
    position: 'absolute',
    height: '100%', width: '100%',
  },
};

const AppCard = ({layers, index}) => (
  <Paper style={ styles.paper }>
    <AppCardToolbar index={ index } />
    <div style={ styles.contentContainerDiv }>
      {
        layers.isHeatmap &&
        <div style={{ ...styles.layerContainerDiv, zIndex: 1 }}>
          <div style={{ backgroundColor: "yellow", height: '100%', width: '100%' }} />
        </div>
      }
      {
        (layers.isTargets || layers.isPosture || layers.isSensor) &&
        <div style={{ ...styles.layerContainerDiv, zIndex: 2 }}>
          <div style={{ backgroundColor: "lightblue", height: '100%', width: '100%' }} />
        </div>
      }
      {
        layers.is3D &&
        <div style={{ ...styles.layerContainerDiv, zIndex: 3 }}>
          <div style={{ backgroundColor: "yellowgreen", height: '100%', width: '100%' }} />
        </div>
      }
    </div>
  </Paper>
);

const mapDispatchToProps = (dispatch) => ({

});

const mapStateToProps = (state, { index }) => ({
  layers: state.display.cards[index].layers,
  index: index,
});

export default connect(mapStateToProps, mapDispatchToProps)(AppCard);
