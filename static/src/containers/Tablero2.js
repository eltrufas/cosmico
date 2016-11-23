import React from 'react';
import VisualizationLayout from './VisualizationLayout';
import { HORIZONTAL_SPLITTER, COUNTER, VERTICAL_SPLITTER, PIE_GRAPH, BAR_GRAPH, COLOR_LOG, CLOCK } from '../constants'


const Home = () => (
  <VisualizationLayout
    components={{
      0: {
        type: VERTICAL_SPLITTER,
        children: [1, 2],
        sizes: ['50%', '50%']
      },
      1: {
        type: BAR_GRAPH,
        sensors:   ['1', '2', '3', '4']
      },
      2: {
        type: HORIZONTAL_SPLITTER,
        children: [3, 4, 5],
        sizes: ['33.33%', '33.33%', '33.33%']
      },
      3: { type: COUNTER,
        sensors: ['1', '2', '3', '4'],
        maxLines: 24
       },
      4: {
        type: PIE_GRAPH,
        sensors:   ['1', '2', '3', '4']
      },
      5: {
        type: CLOCK
      }
    }}
    root={0}
    />
);

export default Home;
