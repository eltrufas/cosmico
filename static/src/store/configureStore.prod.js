import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
//import api from '../middleware/api'
import rootReducer from '../reducers'
import persistState from 'redux-localstorage'
import { apiMiddleware } from 'redux-api-middleware';


export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk)
  )
}
