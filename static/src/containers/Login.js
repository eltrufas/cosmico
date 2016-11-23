import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import * as actions from '../actions/account';
import Subheader from 'material-ui/Subheader';

class Login extends Component {
  constructor() {
    super()

    this.state = {
      username: '',
      password: '',
      usernameError: '',
      passwordError: ''
    };
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value});
    if (e.target.value === '') {
      this.setState({usernameError: 'El campo nombre de usuario es requerido'});;
    } else {
      this.setState({usernameError: ''});;
    }
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
    if (e.target.value === '') {
      this.setState({passwordError: 'El campo contraseña es requerido'});
    } else {
     this.setState({passwordError: ''});;
   }
  }

  handleFormSubmit(e) {
    e.preventDefault();
    let error = false;
    const { username, password } = this.state;
    if (username.length === 0) {
      this.setState({usernameError: 'El campo nombre de usuario es requerido'});;
    }

    if (password.length === 0) {
      this.setState({passwordError: 'El campo contraseña es requerido'});
    }

    if (!error) {
      const { loginUser } = this.props;
      loginUser(username, password)
      console.log('submitted bois');
    }
  }

  render() {
    const { error } = this.props
    const { username, password, usernameError, passwordError } = this.state;
    console.log(this.props)
    return (
      <Paper style={{ maxWidth: '400px', padding: '16px', margin: '20px auto'}}>
      <div style={{margin: '0 auto'}}>
        <form onSubmit={(e) => this.handleFormSubmit(e)} >
          <h2>Inicio de sesión</h2>
          <div style={{color: '#F44336'}} hidden={!error}>Datos incorrectos</div>
          <div>
            <TextField
              floatingLabelText="Nombre de usuario"
              onChange={(e) => this.handleUsernameChange(e)}
              errorText={usernameError}
              value={ username }
            />
          </div>
          <div>
            <TextField
              floatingLabelText="Contraseña"
              value={password}
              onChange={(e) => this.handlePasswordChange(e)}
              errorText={passwordError}
              type="password"
            />
          </div>
          <RaisedButton type="submit" label="ingresar" primary={true} style={{marginTop: '16px'}}/>
        </form>
        </div>
      </Paper>
    )
  }
}


export default connect(null, actions)(Login)
