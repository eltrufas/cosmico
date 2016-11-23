import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/sensors'
import moment from 'moment';
import Paper from 'material-ui/Paper';


class Counter extends Component {
  constructor() {
    super()

  }

  componentDidMount() {
    this.props.fetchNecessarySensors(this.props.sensors);
  }

  render() {
    const { sensors, sensorsObj, totals } = this.props;

    const rows = this.props.sensors
      .map((sensorId, idx) => [
        sensorsObj[sensorId] ? sensorsObj[sensorId].name : 'Cargando',
        totals[sensorId] ? totals[sensorId] : 0
      ]);

    return (
      <Paper className={"full-height"} style={{
        overflow: 'hidden',
        padding: '20px',
        color: '#37474F'

      }}>
        <h2>Impactos en los ultimos 30 minutos</h2>
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: '80%' }}>
          {
            rows.map((row, idx) => (
              <div key={idx}>
                <b style={{fontSize: '24px'}}>{row[0]}:</b> <span style={{fontSize: '64px'}}>{row[1]}</span> <span style={{fontSize: '32px'}}>impactos</span>
              </div>
            ))
          }
        </div>
      </Paper>
    )
  }
}

const mapStateToProps = (state) => ({
  sensorsObj: state.sensors,
  totals: state.totals
})

export default connect(mapStateToProps, actions)(Counter);
