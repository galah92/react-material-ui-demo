import React, { Component } from 'react';
import * as d3 from 'd3';

import { rotateAndReflect, colorScale } from './ImageUtils';


const drawHeatmap = (containerElem, data, reflect, rotate) => {
  data = rotateAndReflect(data, reflect, rotate);
  const data1D = new Array(data.length * data[0].length);
  for (let j = 0; j < data[0].length; j++) {
    for (let i = 0; i < data.length; i++) {
      data1D[j * data.length + i] = data[i][j];
    }
  }
  const color = colorScale.domain([d3.min(data1D), d3.max(data1D)]);
  const n = data.length, m = data[0].length;
  const canvas = d3.select(containerElem).attr("width", n).attr("height", m);
  const context = canvas.node().getContext("2d");
  const image = context.createImageData(n, m);
  for (let j = 0, k = 0, l = 0; j < m; ++j) {
    for (let i = 0; i < n; ++i, ++k, l += 4) {
      let c = d3.rgb(color(data1D[k]));
      image.data[l + 0] = c.r;
      image.data[l + 1] = c.g;
      image.data[l + 2] = c.b;
      image.data[l + 3] = 255;
    }
  }
  context.putImageData(image, 0, 0);
};

const styles = {
  canvas: {
    height: '100%',
    width: '100%',
    imageRendering: 'pixelated',
  },
};

class HeatmapD3Canvas extends Component {

  componentDidMount() {
    drawHeatmap(this.canvasElem, this.props.data, this.props.reflect, this.props.rotate);
  }

  shouldComponentUpdate(nextProps, nextState) {
    drawHeatmap(this.canvasElem, nextProps.data, nextProps.reflect, nextProps.rotate);
    return false;
  }

  render() {
    return (
      <canvas ref={ elem => this.canvasElem = elem } style={ styles.canvas } />
    );
  }
}

export default HeatmapD3Canvas;
