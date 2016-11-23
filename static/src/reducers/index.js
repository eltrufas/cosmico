import { combineReducers } from 'redux';
import account from './account'
import sensors from './sensors'
import totals from './totals'
import dataPoints from './dataPoints'

const rootReducer = combineReducers({
  account,
  sensors,
  totals,
  dataPoints
});

export const getToken = (state) =>  account.getToken(state.account)

export default rootReducer;
