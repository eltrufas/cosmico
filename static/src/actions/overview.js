export const OVERVIEW_REQUEST = 'OVERVIEW_REQUEST'
export const OVERVIEW_SUCCESS = 'OVERVIEW_SUCCESS'
export const OVERVIEW_FAILURE = 'OVERVIEW_FAILURE'

export const refreshOverview = () => (dispatch, getState) => {
  const currentSensors = getState().sensors;

  const sensorIds = Object.keys(currentSensors);

  dispatch({
    type: OVERVIEW_REQUEST,
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
      type: OVERVIEW_SUCCESS,
      payload: json
    })
  })
}
