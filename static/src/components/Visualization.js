import React from 'react';
import Splitter from './Splitter';
import PieGraph from '../containers/PieGraph';
import BarGraph from '../containers/BarGraph';
import ColorLog from '../containers/ColorLog';
import Counter from '../containers/Counter';
import Clock from '../containers/Clock';
import { HORIZONTAL, VERTICAL, HORIZONTAL_SPLITTER, VERTICAL_SPLITTER, PIE_GRAPH, BAR_GRAPH, COLOR_LOG, COUNTER, CLOCK } from '../constants';
import Paper from 'material-ui/Paper';


const Visualization = ({ components, root }) => {
  const root_component = components[root];
  switch (root_component.type) {
    case VERTICAL_SPLITTER:
      return (
        <Splitter direction={ VERTICAL } sizes={root_component.sizes}>
          {
            root_component.children.map(child => (
              <Visualization components={components} root={child} key={child} />
            ))
          }
        </Splitter>
      )
    case HORIZONTAL_SPLITTER:
      return (
        <Splitter direction={ HORIZONTAL } sizes={root_component.sizes}>
          {
            root_component.children.map(child => (
              <Visualization components={components} root={child} key={child}/>
            ))
          }
        </Splitter>
      )
    case PIE_GRAPH:
      return (
        <div
          style={{

            height: '100%',
            width: '100%',
            objectFit: 'contain',
            padding: '10px',
            boxSizing:'border-box'
          }}>
          <Paper style={{height:'100%', boxSizing:'border-box'}}>
            <PieGraph sensors={root_component.sensors} />
          </Paper>
        </div>
      )
    case BAR_GRAPH:
      return (
        <div
          style={{
            height: '100%',
            width: '100%',
            flex: 1,
            objectFit: 'contain',
            padding: '10px',
            boxSizing:'border-box'
          }}>
          <Paper style={{height:'100%', boxSizing:'border-box'}}><BarGraph sensors={root_component.sensors} /> </Paper>
        </div>
      )
      case COLOR_LOG:
        return (
          <div
            style={{
              flex: 1,
              height: '100%',
              width: '100%',
              objectFit: 'contain',
              padding: '10px',
              boxSizing:'border-box',
              overflow: 'hidden'
            }}>
            <Paper style={{height:'100%', boxSizing:'border-box', backgroundColor: '#ECEFF1', padding: '10px',
            overflow: 'hidden'}}>
                <ColorLog sensors={root_component.sensors} maxLines={root_component.maxLines}/>
            </Paper>
          </div>
        )
      case COUNTER:
        return (
          <div
            style={{
              height: '100%',
              width: '100%',
              flex: 1,
              objectFit: 'contain',
              padding: '10px',
              boxSizing:'border-box'
            }}>
            <Counter sensors={root_component.sensors} />
          </div>
        )

        case CLOCK:
          return (
            <div
              style={{
                height: '100%',
                width: '100%',
                flex: 1,
                objectFit: 'contain',
                padding: '10px',
                boxSizing:'border-box'
              }}>
              <Clock sensors={root_component.sensors} />
            </div>
          )
    default:
      return <div
      style={{
        flex: 1
      }}>{root}</div>
  }
}

export default Visualization
