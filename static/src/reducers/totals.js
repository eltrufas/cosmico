import * as actions from '../actions/totals';
import createReducer from './createReducer';

const totals = createReducer({}, {
  [actions.TOTALS_SUCCESS](state, action) {
    return {
      ...action.payload
    }
  }
})

export default totals
