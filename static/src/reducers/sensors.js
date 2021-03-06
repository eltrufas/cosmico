import * as actions from '../actions/sensors';
import createReducer from './createReducer';

const sensors = createReducer({}, {
  [actions.SENSOR_SUCCESS](state, action) {
    return {
      ...state,
      ...action.payload
    }
  }
})

export default sensors
