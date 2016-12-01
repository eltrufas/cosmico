import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions/sensors'

const connectToDataPoints = (WrappedComponent) => {
  class connected extends Component {
    componentDidMount() {
      this.props.fetchNecessarySensors(this.props.sensors);
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  const mapStateToProps = (state) => ({
    sensorsObj: state.sensors,
    overview: state.overview,
    totals: state.totals,
    dataPoint: state.dataPoint
  });

  return connect(mapStateToProps, actions)(connected);
}

export default connectToDataPoints;
