import React from 'react';

export default ({ aspectRatio = 1, children, style, ...rest }) => {
  const multiplier = calculateAspectRatio(aspectRatio);

  return (
    <div style={{ position: 'relative', ...style }} {...rest}>
      <div style={{ display: 'block', paddingTop: 100 * multiplier + '%' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, top: 0, right: 0 }}>{children}</div>
    </div>
  );
};

const calculateAspectRatio = aspectRatio => {
  if (isFinite(aspectRatio)) {
    return 1 / aspectRatio;
  } else if (isArray(aspectRatio) && aspectRatio[0] !== undefined && aspectRatio[1] !== undefined) {
    return aspectRatio[1] / aspectRatio[0];
  } else if (aspectRatio.width !== undefined && aspectRatio.height !== undefined) {
    return aspectRatio.height / aspectRatio.width;
  } else if (isString(aspectRatio)) {
    const parsedValue = Number.parseFloat(aspectRatio);
    if (isNaN(parsedValue)) {
      throw new Error('Cannot parse input string: ' + aspectRatio);
    }
    return 1 / Number.parseFloat(aspectRatio);
  }

  throw new Error('Cannot parse props.aspectRatio: ' + aspectRatio);
};

export { calculateAspectRatio };
