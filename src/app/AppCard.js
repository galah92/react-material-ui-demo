import React from 'react';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

import AppCardToolbar from './AppCardToolbar';
import HeatmapH337 from '../layers/HeatmapH337';
import HeatmapD3Canvas from '../layers/HeatmapD3Canvas';
import HeatmapD3ContourSVG from '../layers/HeatmapD3ContourSVG';
import TrackerSVG from '../layers/TrackerSVG';
import SensorSVG from '../layers/SensorSVG';
import ThreeD from '../layers/ThreeD';


const styles = {
  paper: {
    height: '100%',
  },
  contentContainerDiv: {
    height: 'calc(100% - 64px)',
    position: 'relative',
    overflow: 'hidden',
  },
  layerContainerDiv: {
    position: 'absolute',
    height: '100%', width: '100%',
  },
};

const AppCard = (props) => (
  <Paper style={ styles.paper }>
    <AppCardToolbar index={ props.index } />
    <Divider />
    <div style={ styles.contentContainerDiv }>
      {
        props.layers.isHeatmap1 &&
        <div style={{ ...styles.layerContainerDiv, zIndex: 1 }}>
        <HeatmapD3ContourSVG
          data={ props.data.heatmap.Data }
          rotate={ props.rotate } reflect={ props.reflect }
        />
        </div>
      } {
        props.layers.isHeatmap2 &&
        <div style={{ ...styles.layerContainerDiv, zIndex: 1 }}>
          <HeatmapD3Canvas
            data={ props.data.heatmap.Data }
            rotate={ props.rotate } reflect={ props.reflect }
          />
        </div>
      } {
        props.layers.isHeatmap3 &&
        <div style={{ ...styles.layerContainerDiv, zIndex: 1 }}>
          <HeatmapH337
            data={ props.data.heatmap.Data }
            rotate={ props.rotate } reflect={ props.reflect }
          />
        </div>
      } {
        props.layers.isSensor &&
        <div style={{ ...styles.layerContainerDiv, zIndex: 3 }}>
          <SensorSVG
            room={ props.data.trackerInit }
            rotate={ props.rotate } reflect={ props.reflect }
          />
        </div>
      } {
        (props.layers.isTargets || props.layers.isPosture) &&
        <div style={{ ...styles.layerContainerDiv, zIndex: 3 }}>
          <TrackerSVG
            isPosture={ props.layers.isPosture }
            rotate={ props.rotate } reflect={ props.reflect }
          />
        </div>
      } {
        props.layers.is3D &&
        <div style={{ ...styles.layerContainerDiv, zIndex: 4 }}>
          <ThreeD data={ props.data.threeD.Data }
            rotate={ props.rotate } reflect={ props.reflect }
          />
        </div>
      }
    </div>
  </Paper>
);

const mapDispatchToProps = (dispatch) => ({

});

const mapStateToProps = (state, { index }) => ({
  index: index,
  layers: state.display.cards[index].layers,
  rotate: state.display.cards[index].rotate,
  reflect: state.display.cards[index].reflect,
  data: state.data,
});

export default connect(mapStateToProps, mapDispatchToProps)(AppCard);
