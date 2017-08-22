import React, { Component } from 'react';
import * as d3 from 'd3';
import * as d3contour from 'd3-contour';

import { rotateAndReflect, colorScale } from './ImageUtils';


const SMOOTH_FACTOR = 25;
const VIEWBOX = 100;

const scale = (xSize, ySize) => d3.geoTransform({ point: function(x, y) {
  this.stream.point(x * VIEWBOX / xSize, y * VIEWBOX / ySize);
}, });

const drawContour = (containerElem, data, reflect, rotate) => {
  data = rotateAndReflect(data, reflect, rotate);
  let data1D = new Array(data.length * data[0].length);
  for (let j = 0; j < data[0].length; j++) {
    for (let i = 0; i < data.length; i++) {
      data1D[j * data.length + i] = data[i][j];
    }
  }
  const min = d3.min(data1D), max = d3.max(data1D);
  const color = colorScale.domain([min, max]);
  d3.select(containerElem).selectAll("*").remove();
  d3.select(containerElem).selectAll("path")
    .data(d3contour.contours()
      .thresholds(d3.range(min, max, (max - min) / SMOOTH_FACTOR))
      .size([data.length, data[0].length])(data1D))
    .enter().append("path")
      .attr("d", d3.geoPath().projection(scale(data.length, data[0].length)))
      .attr("fill", d => color(d.value));
};

const styles = {
  svg: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgb(0, 0, 131)',
  },
};

class HeatmapD3ContourSVG extends Component {

  componentDidMount() {
    drawContour(this.svgElem, this.props.data, this.props.reflect, this.props.rotate);
  }

  shouldComponentUpdate(nextProps, nextState) {
    drawContour(this.svgElem, nextProps.data, nextProps.reflect, nextProps.rotate);
    return false;
  }

  render() {
    return (
      <svg
      ref={ elem => this.svgElem = elem } style={ styles.svg }
      viewBox={ "0 0 "+ VIEWBOX +" "+ VIEWBOX } preserveAspectRatio="none" />
    );
  }

}

export default HeatmapD3ContourSVG;
