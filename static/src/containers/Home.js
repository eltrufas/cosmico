import React from 'react';
import VisualizationLayout from './VisualizationLayout';
import { HORIZONTAL_SPLITTER, COUNTER, VERTICAL_SPLITTER, PIE_GRAPH, BAR_GRAPH, COLOR_LOG } from '../constants'


const Home = () => (
  <VisualizationLayout
    components={{
      0: {
        type: HORIZONTAL_SPLITTER,
        children: [1, 3],
        sizes: ['70%', '30%']
      },
      1: {
        type: VERTICAL_SPLITTER,
        children: [4, 5],
        sizes: ['50%', '50%']
      },
      2: {
        type: PIE_GRAPH,
        sensors: ['1', '2', '3', '4']
      },
      3: { type: COLOR_LOG,
        sensors: ['1', '2', '3', '4'],
        maxLines: 24
       },
      4: {
        type: BAR_GRAPH,
        sensors:   ['1', '2', '3', '4']
      },
      5: {
        type: HORIZONTAL_SPLITTER,
        children: [2, 6],
        sizes: ['50%', '50%']
      },
      6: {
        type: COUNTER,
        sensors: ['1', '2', '3', '4'],
      }
    }}
    root={0}
    />
);

export default Home;
