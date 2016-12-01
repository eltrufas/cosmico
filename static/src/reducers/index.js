import { combineReducers } from 'redux';
import account from './account';
import sensors from './sensors';
import totals from './totals';
import overview from './overview';
import dataPoint from './dataPoint';

const rootReducer = combineReducers({
  account,
  sensors,
  totals,
  overview,
  dataPoint
});

export const getToken = (state) =>  account.getToken(state.account);

export default rootReducer;
