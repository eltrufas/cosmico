import * as actions from '../actions/overview';
import createReducer from './createReducer';

const dataPoints = createReducer([], {
  [actions.OVERVIEW_SUCCESS](state, action) {
    return action.payload.slice()
  }
})

export default dataPoints
