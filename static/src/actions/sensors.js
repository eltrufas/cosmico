export const SENSOR_REQUEST = 'SENSOR_REQUEST'
export const SENSOR_SUCCESS = 'SENSOR_SUCCESS'
export const SENSOR_FAILURE = 'SENSOR_FAILURE'

export const fetchNecessarySensors = (sensors) => (dispatch, getState) => {
  const currentSensors = getState().sensors;
  sensors = sensors.filter(sensor => !currentSensors[sensor]);

  dispatch({
    type: SENSOR_REQUEST,
    payload: sensors
  })

  fetch('/api/get_sensors', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({'sensors': sensors})
  })
  .then(res => res.json())
  .then(json => {
    const sensors = {};

    json.forEach(sensor => sensors[sensor.id] = sensor);

    dispatch({
      type: SENSOR_SUCCESS,
      payload: sensors
    })
  })
}
