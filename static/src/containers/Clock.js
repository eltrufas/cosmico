import React, { Component } from 'react';
import Login from './Login';
import Paper from 'material-ui/Paper';
import moment from 'moment';


class Clock extends Component {
  constructor() {
    super();
    this.state = {hour: '', date: ''}
  }

  componentDidMount() {
    setInterval(() => {
      const date = moment().format("dddd, MMMM D YYYY");
      const hour = moment().format("hh:mm:ss a");

      this.setState({date, hour});
    }, 1000)
  }

  render() {
    return (
      <Paper className={"full-height"} style={{
        overflow: 'hidden',
        padding: '20px',
        color: '#37474F',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <div style={{fontSize: '2em'}}>{this.state.date}</div>
        <div style={{fontSize: '4em'}}>{this.state.hour}</div>
      </Paper>
    )
  }
}

export default Clock
