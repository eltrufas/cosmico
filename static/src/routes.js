import React from 'react';
import { Route, IndexRoute } from 'react-router';;
import App from './containers/App';
import LoginCheck from './containers/LoginCheck';
import ExportData from './containers/ExportData';
import Home from './containers/Home';
import Tablero2 from './containers/Tablero2';

import AdminHome from './containers/AdminHome';



export default (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='/admin' component={LoginCheck}>
      <IndexRoute component={AdminHome} />
    </Route>
    <Route path='/exportar' component={ExportData} />
    <Route path='/tablero/1' component={Home} />
    <Route path='/tablero/2' component={Tablero2} />
  </Route>
)
