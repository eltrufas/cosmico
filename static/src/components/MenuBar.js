import React from 'react';

const MenuBar = ({ onMenuButtonClick }) => (
  <div>
    <button onClick={onMenuButtonClick}>toggle menu</button>
    <div>Menu</div>
  </div>
);

export default MenuBar;
