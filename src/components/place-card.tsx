import React from 'react';
import logo from '../assets/vine.png'; // with import

export function PlaceCard(props: { name: string }) {
  return (
    <div className='place-card'>
      <div className='backside'></div>
      <div className='front'>
        <img className='vine' src={logo} alt='vine' />
        <h2 className='name'>{props.name}</h2>
      </div>
    </div>
  );
}
