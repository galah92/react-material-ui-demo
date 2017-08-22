import React, {Component} from 'react';

import {init, animate} from './ThreeDUtils';
import { rotateAndReflect } from './ImageUtils';


const styles = {
  divContainer: {
    height: '100%',
    width: '100%',
  },
};

class ThreeD extends Component {

  componentDidMount() {
    let data = rotateAndReflect(this.props.data, this.props.reflect, this.props.rotate);
    init(this.div, data);
    animate(data);
  }

  shouldComponentUpdate(nextProps, nextState) {
    animate(rotateAndReflect(nextProps.data, nextProps.reflect, nextProps.rotate));
    return false;
  }

  render() {
    return (
      <div style={ styles.divContainer } ref={ div => this.div = div } />
    );
  }

}

export default ThreeD;
