import React from 'react';
import { VERTICAL } from '../constants'

const Splitter = ({ children, direction, sizes }) => {
  const sizeProp = direction === VERTICAL ? 'height' : 'width'
  const otherThing = direction === VERTICAL ? 'width' : 'height'

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: direction === VERTICAL ? 'column' : 'row',
        flex: 1,
        height: '100%',
        width: '100%'
      }}
      >
      { children.map((child, idx) => (
        <div
          style={{
            [sizeProp]: sizes[idx],
            [otherThing]: '100%'
          }}
          key={idx}
          >
          {child}
        </div>
      )) }
    </div>
  );
}

export default Splitter;
