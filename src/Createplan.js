import React from 'react';
import { Link } from 'react-router-dom';
import backim11 from './backimage.jpeg'
import new12 from './new12.png'

function InputNumberComponent({ setNumber }) {
  return (
    <div className='backimage2' style={{ backgroundImage: `url(${new12})` }}>


      <button><Link to='s2'>plan Swarm</Link></button>
      <button ><Link to='maps'>maps</Link></button>
    </div>
  );
}

export default InputNumberComponent;
