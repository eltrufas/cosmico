import React, { Component } from 'react';
import * as totalActions from '../actions/totals';
import * as overviewActions from '../actions/overview';
import { connect } from 'react-redux'
import Visualization from '../components/Visualization'

class VisualizationLayout extends Component {
  constructor(props) {
    super(props);

    const state = {
      interval: null
    };

    if (!props.components && !props.root) {
      state.components = {};
      state.root = null;
      state.loaded = false;
    }

    this.state = state;
  }

  componentDidMount() {
    const interval = setInterval(() => {
      this.props.refreshTotals();
      this.props.refreshOverview();
    }, 2000);

    this.setState({ interval });

    if (!this.props.components) {
      // TODO: Load layout from backend
    }
  }

  componentWillUnmount() {
    if (this.state.interval) {
      clearInterval(this.state.interval);
    }
  }

  render() {
    if (this.props.components) {
      const { components, root } = this.props
      return <Visualization components={components} root={root}/>
    } else {
      if (this.state.loaded) {
        const { components, root } = this.state;
        return <div style={{height: '100vh'}}><Visualization components={components} root={root}/></div>
      } else {
        return <div>Loading</div>
      }
    }
  }
}

export default connect(null, {...totalActions, ...overviewActions})(VisualizationLayout);
