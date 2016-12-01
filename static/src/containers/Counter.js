import React from 'react';
import connectToDataPoints from '../connectToDataPoints';
import Paper from 'material-ui/Paper';


const Counter = ({ sensorsObj, totals, sensors }) => {
  const rows = sensors
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

export default connectToDataPoints(Counter);
