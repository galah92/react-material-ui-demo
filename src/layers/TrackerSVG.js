import React from 'react';
import { connect } from 'react-redux'

import sittingSrc from '../styles/images/sitting.png';
import standingSrc from '../styles/images/standing.png';
import lyingSrc from '../styles/images/lying.png';
import walkingSrc from '../styles/images/walking.png';
import noPostureSrc from '../styles/images/no-posture.png';


const ICON_W = 7;
const ICON_H = 7;
const VB = 100;

const convertData = (data) => {
  const numOfTargets = Math.min(
    data.PostureVector.filter(x => x !== "NA").length,
    data.LocationMatrix.filter(x => x[0] !== "NaN").length
  );
  return Array(numOfTargets).fill().map((_, i) => ({
    posture: data.PostureVector[i],
    activity: data.ActivityVector[i],
    loc: data.LocationMatrix[i],
  }));
};

const POSTURES =  {
  Sitting: sittingSrc,
  Standing: standingSrc,
  Lying: lyingSrc,
  Walking: walkingSrc,
};

const styles = {
  svg: {
    height: '100%',
    width: '100%',
  },
};

const TrackerSVG = ({targets, room, isPosture, rotate, reflect}) => {
  const [arenaWidth, arenaHeight] = room.Data[0];
  const [sensorX, sensorY] = room.Data[1];
  const targetsX = convertData(targets);
  return (
    <svg
      style={ styles.svg }
      viewBox={ "0 0 "+ VB +" "+ VB }
      preserveAspectRatio="none">
      <g transform={ "rotate(" + -rotate * 90 + " " + VB / 2 + " " + VB / 2 + ")" }>
        {
          targetsX.map((target, i) => {
            let x = ((target.loc[0] + sensorX) / arenaWidth * VB) - (ICON_W / 2);
            let y = ((target.loc[1] + sensorY) / arenaHeight * VB) - (ICON_H / 2);
            return (
              <svg
                key={ i }
                height={ ICON_H } width={ ICON_W }
                x={ reflect ? y : x }
                y={ reflect ? x : y }
              >
                <g transform={ "rotate(" + rotate * 90 + " " + ICON_W / 2 + " " + ICON_H / 2 + ")" }>
                  <image
                    height={ ICON_H } width={ ICON_W }
                    href={ isPosture ? POSTURES[target.posture] : noPostureSrc }
                  />
                </g>
              </svg>
            );
          } )
        }
      </g>
    </svg>
  )
};

const mapDispatchToProps = (dispatch) => ({

});

const mapStateToProps = (state, ownProps) => ({
  targets: state.data.tracker,
  room: state.data.trackerInit,
  isPosture: ownProps.isPosture,
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackerSVG);
