import React from 'react';

import sensorSrc from '../styles/images/sensor.png';


const ICON_W = 5;
const ICON_H = 5;
const VB = 100;

const styles = {
  svg: {
    height: '100%',
    width: '100%',
  },
};

const TrackerSVG = ({room, rotate, reflect}) => {
  const [arenaWidth, arenaHeight] = room.Data[0];
  const [sensorX, sensorY] = room.Data[1];
  const x = ((sensorX) / arenaWidth * VB - (ICON_W / 2));
  const y = ((sensorY) / arenaHeight * VB) - (ICON_H / 2);
  return (
    <svg
      style={ styles.svg }
      viewBox={ "0 0 "+ VB +" "+ VB }
      preserveAspectRatio="none">
      <g transform={ "rotate(" + -rotate * 90 + " " + VB / 2 + " " + VB / 2 + ")" }>
        <svg
          height={ ICON_H } width={ ICON_W }
          x={ reflect ? y : x }
          y={ reflect ? x : y }
        >
          <g transform={ "rotate(" + rotate * 90 + " " + ICON_W / 2 + " " + ICON_H / 2 + ")" }>
            <image
              height={ ICON_H } width={ ICON_W }
              href={ sensorSrc }
            />
          </g>
        </svg>
      </g>
    </svg>
  )
};

export default TrackerSVG;
