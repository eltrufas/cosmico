import React from 'react';
import { connect } from 'react-redux';
import Login from './Login'
import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';

const LoginCheck = ({ isLoading, token, error, children }) =>  {
  if (token) {
    return (
      <div>
        { children }
      </div>
    )
  }

  if (isLoading) {
    return (
      <Paper style={{ maxWidth: '500px', padding: '16px', margin: '20px auto'}}>
        <CircularProgress />
      </Paper>
    )
  }

  return <Login error={error} />
}

const mapStateToProps = (state) => {
  return { ...state.account };
}

export default connect(mapStateToProps)(LoginCheck);
