import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import App from './App';
import routes from '../routes'
import { Router } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


export default class Root extends Component {
  render() {
    const { store, history } = this.props
    return (
      <Provider store={store}>
        <div className="full-height">

          <MuiThemeProvider>
            <Router history={history} routes={routes} />
          </MuiThemeProvider>
        </div>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
