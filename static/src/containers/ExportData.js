import React, { Component } from 'react';
import moment from 'moment';
import Paper from 'material-ui/Paper';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';


const colors = [
  '#2196F3',
  '#F44336',
  '#FF9800',
  '#4CAF50'
]

class ExportData extends Component {
  constructor() {
    super();

    this.state = {
      since: new Date(),
      until: new Date()
    };
  }

  handleSinceChange = (event, date) => {
    console.log('hi');
    this.setState({
      since: date
    });
  };

  handleUntilChange = (event, date) => {
    this.setState({
      until: date
    });
  };

  generateLink() {
    const { since, until } = this.state;
    return `/api/download_data?since=${since.getTime() / 1000}&until=${until.getTime() / 1000}`;
  }

  render() {
    return (
      <Paper style={{ maxWidth: '500px', padding: '16px', margin: '20px auto'}}>
        <h1>Exportar datos</h1>
        <DatePicker
          hintText="Desde"
          floatingLabelText="Desde"
          value={this.state.since}
          maxDate={this.state.until}
          fullWidth={true}
          container="inline"
          onChange={this.handleSinceChange}
        />

        <DatePicker
          hintText="Hasta"
          floatingLabelText="Hasta"
          value={this.state.until}
          minDate={this.state.since}
          fullWidth={true}
          container="inline"
          onChange={this.handleUntilChange}
        />

        <a href={this.generateLink()}>
          <RaisedButton
            label="Descargar csv"
            fullWidth={true}
            primary={true}

          />
        </a>
      </Paper>
    )
  }
}

export default ExportData;
