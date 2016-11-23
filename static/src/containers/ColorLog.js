import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/sensors'
import moment from 'moment';
import Paper from 'material-ui/Paper';

const colors = [
  '#2196F3',
  '#F44336',
  '#FF9800',
  '#4CAF50'
]

function compareDataPoint(a, b) {
  if (moment(a.date) < moment(b.date))
    return -1;
  if (moment(a.date) > moment(b.date))
    return 1;
  return 0;
}

class ColorLog extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.fetchNecessarySensors(this.props.sensors);
  }

  componentWillUnmount() {

  }

  render() {
    const { data, sensorsObj } = this.props;

    console.log('//////',this.props)

    return (
      <div className={"full-height"}>
        {
          data.map(datum => (
            <Paper
              key={datum.id}
              style={{
                color: colors[datum.sensor_id - 1],
                padding: '8px',
                fontSize:'2em',
                marginBottom: '10px'
              }}>
              <span style={{fontSize:'0.5em'}}>{moment(datum.date).format('HH:mm:ss')} </span>
              <span>Impacto en la {sensorsObj[datum.sensor_id].name}</span>
            </Paper>
          ))
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  sensorsObj: state.sensors,
  data: state.dataPoints
})

export default connect(mapStateToProps, actions)(ColorLog);
