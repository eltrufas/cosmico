import React from 'react';
import connectToDataPoints from '../connectToDataPoints';
import {Chart} from 'react-google-charts';

const unsusedColors = [
  '#2196F3',
  '#F44336',
  '#FF9800',
  '#4CAF50'
]

const PieGraph = ({ sensorsObj, totals, sensors, key }) => {
  const rows = sensors
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
        graph_id={key}
        width="100%"
        height="100%"
        legend_toggle

       />
    </div>
  );
}
export default connectToDataPoints(PieGraph);
