import * as actions from '../actions/account';
import createReducer from './createReducer';
import { combineReducers } from 'redux';

const isLoading = createReducer(false, {
  [actions.LOGIN_SUCCESS](state, action) {
    return false;
  },
  [actions.LOGIN_FAILURE](state, action) {
    return false;
  },
  [actions.LOGIN_REQUEST](state, action) {
    return true;
  }
});

const token = createReducer(null, {
  [actions.LOGIN_SUCCESS](state, action) {
    return action.payload.token;
  },
  [actions.LOGIN_FAILURE](state, action) {
    return state;
  },
  [actions.LOGIN_REQUEST](state, action) {
    return state;
  },
})

const details = createReducer({}, {
  [actions.LOGIN_SUCCESS](state, action) {
    return state;
  },
  [actions.LOGIN_FAILURE](state, action) {
    return {};
  },
  [actions.LOGIN_REQUEST](state, action) {
    return action.payload;
  }
})

const error = createReducer("", {
  [actions.LOGIN_SUCCESS](state, action) {
    return "";
  },
  [actions.LOGIN_FAILURE](state, action) {
    return "No se pudo iniciar sesión";
  },
  [actions.LOGIN_REQUEST](state, action) {
    return "";
  }
})

export const getToken = (state) =>  state.token

export default combineReducers({
  isLoading,
  token,
  details,
  error
})
