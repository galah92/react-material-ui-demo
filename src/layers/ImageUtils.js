import * as d3 from 'd3';


const rotate90DegRight = (arr) => {
  const result = new Array(arr[0].length);
  for (let i = 0; i < arr[0].length; i++) {
    result[i] = new Array(arr.length);
    for (let j = 0; j < arr.length; j++) {
      result[i][j] = arr[arr.length - j - 1][i];
    }
  }
  return result;
};

export const rotateAndReflect = (arr, reflect, rotate) => {
  let result = reflect ? d3.transpose(arr) : arr;
  Array(rotate).fill().map(_ => result = rotate90DegRight(result));
  return result;
};

export const colorScale = d3.scaleSequential(d3.interpolateRgbBasis([
  d3.rgb(0, 0, 131),
  d3.rgb(0, 60, 170),
  d3.rgb(5, 255, 255),
  d3.rgb(255, 255, 0),
  d3.rgb(250, 0, 0),
  d3.rgb(128, 0, 0),
]));
