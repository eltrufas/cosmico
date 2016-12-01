import React from 'react';
import connectToDataPoints from '../connectToDataPoints';
import moment from 'moment';
import Paper from 'material-ui/Paper';

const colors = [
  '#2196F3',
  '#F44336',
  '#FF9800',
  '#4CAF50'
]

const ColorLog = ({ overview, sensorsObj }) => {
  return (
    <div className={"full-height"}>
      {
        overview.map(datum => (
          <Paper
            key={datum.id}
            style={{
              color: colors[datum.sensor_id - 1],
              padding: '8px',
              fontSize:'1.6em',
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

export default connectToDataPoints(ColorLog);
