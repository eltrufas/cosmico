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

class BarGraph extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    /*const unsubscribe = updater.subscribe(event => {
      if (event.type === 'sensor') {
        const { sensors } = this.state;
        const sensorObj = {};
        event.sensors
          .filter(sensor => this.props.sensors.indexOf(sensor.id.toString()) !== -1)
          .forEach(sensor => sensorObj[sensor.id] = sensor);

        this.setState({sensors: { ...sensors, ...sensorObj }});
      }

      if (event.type === 'data') {
        const { totals, data } = this.state;
        console.log(event.data)
        Object.keys(event.data)
          .filter(id => this.props.sensors.indexOf(id) !== -1)
          .forEach(id => {
            const newData = event.data[id]

            if (!data[id]) {
              data[id] = [];
            }

            data[id] = data[id].concat(newData)
              .filter(datum => {
                return moment(datum.date) > moment().subtract(30, 'minutes')
              });
          })

        this.setState({ totals, data });
      }
    })*/


    this.props.fetchNecessarySensors(this.props.sensors);

    /*fetch('/api/get_sensors', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'sensors': this.props.sensors})
    })
    .then(res => res.json())
    .then(json => {
      const sensors = {};

      json.forEach(sensor => sensors[sensor.id] = sensor);

      this.setState({sensors, sensorsLoaded: true});
    })

    const interval = setInterval(() => {
      this.fetchData()
    }, 500)

    this.fetchData()


    this.setState({ interval });*/
  }

  fetchData() {
    return fetch(`/api/get_frequencies?since=${moment().subtract(30, 'minutes').valueOf() / 1000}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'sensors': this.props.sensors})
    })
    .then(res => res.json())
    .then(totals => {
      this.setState({totals, dataLoaded: true})
    })
  }

  render() {
    const { sensors, sensorsObj, totals } = this.props;

    const rows = this.props.sensors
      .map((sensorId, idx) => [
        sensorsObj[sensorId] ? sensorsObj[sensorId].name : 'Cargando',
        totals[sensorId] ? totals[sensorId] : 0,
        unsusedColors[idx]
      ]);

    console.log(rows)

    return (
      <div className={"full-height"} style={{
        overflow: 'hidden'
      }}>
        <Chart
          chartType="BarChart"
          data={[['Sensor', 'Frecuencia', {role: 'style'}]].concat(rows)}
          options={{
            animation: {
              startup: false,
              duration: 200,
              easing: 'inAndOut'
            }
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

export default connect(mapStateToProps, actions)(BarGraph);
