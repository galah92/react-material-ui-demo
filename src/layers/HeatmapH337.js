import React, { Component } from 'react';
import h337 from 'heatmapjs';

import { rotateAndReflect } from './ImageUtils';


const drawHeatmap = (containerElem, data, reflect, rotate) => {
  data = rotateAndReflect(data, reflect, rotate);
  const config = {
    container: containerElem,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    maxOpacity: 0.9,
    minOpacity: 0.8,
    radius: 65,
  };
  let hmjs = h337.create(config);
  const min = Math.min( ...data.map(line => Math.min(...line)) );
  const max = Math.max( ...data.map(line => Math.max(...line)) );
  const scaleX = containerElem.clientWidth / data.length;
  const scaleY = containerElem.clientHeight / data[0].length;
  let dataSet = [];
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[0].length; j++) {
      dataSet.push({
        x: i * scaleX,
        y: j * scaleY,
        value: (data[i][j] - min) / (max - min) * 100,
    });
    }
  }
  hmjs.setData({ min: 0, max: 100, data: dataSet });
}

const styles = {
  containerDiv: {
    height: '100%',
    width: '100%',
    backgroundColor: "yellow",
  },
};

class HeatmapH337 extends Component {

  componentDidMount() {
    drawHeatmap(this.div, this.props.data, this.props.reflect, this.props.rotate);
  }

  shouldComponentUpdate(nextProps, nextState) {
    drawHeatmap(this.div, nextProps.data, nextProps.reflect, nextProps.rotate);
    return false;
  }

  render() {
    return (
      <div
        ref={ elem => this.div = elem }
        style={ styles.containerDiv }
        className="heatmapH377ContainerDiv"  // a patch for css responsivness
      />
    );
  }
}

export default HeatmapH337;
