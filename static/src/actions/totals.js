import moment from 'moment'

export const TOTALS_REQUEST = 'TOTALS_REQUEST'
export const TOTALS_SUCCESS = 'TOTALS_SUCCESS'
export const TOTALS_FAILURE = 'TOTALS_FAILURE'

export const refreshTotals = () => (dispatch, getState) => {
  const currentSensors = getState().sensors;

  const sensorIds = Object.keys(currentSensors)

  dispatch({
    type: TOTALS_REQUEST,
  })

  fetch(`/api/get_frequencies?since=${moment().subtract(30, 'minutes').valueOf() / 1000}`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({'sensors': sensorIds})
  })
  .then(res => res.json())
  .then(json => {
    dispatch({
      type: TOTALS_SUCCESS,
      payload: json
    })
  })
}
