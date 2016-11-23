import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/sensors'
import {Chart} from 'react-google-charts';
import updater from '../SensorUpdate';
import moment from 'moment';

const unsusedColors = [
  '#2196F3',
  '#F44336',
  '#FF9800',
  '#4CAF50'
]

class PieGraph extends Component {
  constructor() {
    super()

    this.state = {sensors: {}, data: {}, totals: {}, interval: null};
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
      <div className={"full-height"}>
        <Chart
          chartType="PieChart"
          data={[['Sensor', 'Frecuencia']].concat(rows)}
          options={{
            colors: unsusedColors,
            animation:{
              duration: 2000,
              easing: 'inAndOut',
            },
          }}
          graph_id={this.props.key}
          width="100%"
          height="100%"
          legend_toggle

         />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  sensorsObj: state.sensors,
  totals: state.totals
})

export default connect(mapStateToProps, actions)(PieGraph);
