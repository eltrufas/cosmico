import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root';
import configureStore from './store/configureStore';
import { browserHistory } from 'react-router';
import moment from 'moment';

import './index.css';

moment.locale('es');

const store = configureStore();

ReactDOM.render(
  <Root store={store} history={browserHistory}/>,
  document.getElementById('root')
);
