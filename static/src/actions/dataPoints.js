export const DATA_POINT_REQUEST = 'DATA_POINT_REQUEST'
export const DATA_POINT_SUCCESS = 'DATA_POINT_SUCCESS'
export const DATA_POINT_FAILURE = 'DATA_POINT_FAILURE'

export const refreshDataPoints = () => (dispatch, getState) => {
  const currentSensors = getState().sensors;

  const sensorIds = Object.keys(currentSensors)

  dispatch({
    type: DATA_POINT_REQUEST,
  })

  fetch(`/api/get_data`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({'sensors': sensorIds})
  })
  .then(res => res.json())
  .then(json => {
    dispatch({
      type: DATA_POINT_SUCCESS,
      payload: json
    })
  })
}
