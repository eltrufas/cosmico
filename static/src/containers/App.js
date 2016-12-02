import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./App.css";
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import List from 'material-ui/List';

import Subheader from 'material-ui/Subheader';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

class App extends Component {
  constructor(props) {
    super(props);
    this.handleMenuOpen = this.handleMenuOpen.bind(this);

    this.state = {drawerOpen: false};
  }

  handleMenuOpen() {
    this.setState({ drawerOpen: !this.state.drawerOpen});
  }

  render() {
    const { isLoggedIn, name } = this.props
    return (
      <div className="full-height">
        <Drawer
          docked={false}
          open={this.state.drawerOpen}
          onRequestChange={(drawerOpen) => this.setState({drawerOpen})}
          >
          <List>
            <Subheader>Navegacion</Subheader>
            <Link style={{ textDecoration: 'none' }} to="/"><MenuItem>Inicio</MenuItem></Link>
            <Link style={{ textDecoration: 'none' }} to="/exportar"><MenuItem>Exportar datos</MenuItem></Link>

          </List>
          <Divider />
          <List>
            <Subheader>Tableros</Subheader>
            <Link style={{ textDecoration: 'none' }} to="/tablero/1"><MenuItem>Tablero 1</MenuItem></Link>
            <Link style={{ textDecoration: 'none' }} to="/tablero/2"><MenuItem>Tablero 2</MenuItem></Link>
          </List>
          <Divider />
          <List>
            <Subheader>Administracion</Subheader>
            <Link style={{ textDecoration: 'none' }} to="/admin"><MenuItem>Pagina de administrador</MenuItem></Link>
          </List>
        </Drawer>
        <AppBar
          onLeftIconButtonTouchTap={this.handleMenuOpen}
          title="Visualización de particulas cosmicas"
          iconElementRight={isLoggedIn ?
            <FlatButton label={`Hola, ${name}`} containerElement={<Link to="/admin" />} /> :
            <FlatButton label="Ingresar" linkButton={true} containerElement={<Link to="/admin" />} />}
        />
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {isLoggedIn: !!state.account.token, name: state.account.details.name}
}

export default connect(mapStateToProps)(App);
