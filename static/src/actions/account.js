import * as api from './api'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export const loginUser = (name, password) => (dispatch) => {
  dispatch({
    type: LOGIN_REQUEST,
    payload: { name }
  })

  return api.loginUser(name, password)
    .then(payload => {
      if (payload.error) {
        dispatch({
          type: LOGIN_FAILURE,
          error: payload.error || "No se pudo iniciar sesión"
        })
      } else {
        dispatch({
          type: LOGIN_SUCCESS,
          payload
        })
      }
    },
    error => {
      dispatch({
        type: LOGIN_FAILURE,
        error: error.message || "No se pudo iniciar sesión"
      })
    })
}
