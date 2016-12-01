import React from 'react';
import connectToDataPoints from '../connectToDataPoints';
import { Chart } from 'react-google-charts';

const unsusedColors = [
  '#2196F3',
  '#F44336',
  '#FF9800',
  '#4CAF50'
]

const BarGraph = ({ sensorsObj, totals, key, sensors }) => {
  const rows = sensors
    .map((sensorId, idx) => [
      sensorsObj[sensorId] ? sensorsObj[sensorId].name : 'Cargando',
      totals[sensorId] ? totals[sensorId] : 0,
      unsusedColors[idx]
    ]);

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
        graph_id={key}
        width="100%"
        height="100%"
        legend_toggle
       />
    </div>
  )
}

export default connectToDataPoints(BarGraph);
