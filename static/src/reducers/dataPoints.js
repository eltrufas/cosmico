import * as actions from '../actions/dataPoints';
import createReducer from './createReducer';

const dataPoints = createReducer([], {
  [actions.DATA_POINT_SUCCESS](state, action) {
    console.log('xDDDDDDDDDDDD')
    return action.payload.slice()
  }
})

export default dataPoints
