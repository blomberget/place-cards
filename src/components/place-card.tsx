import React from 'react';
import logo from '../assets/vine.png'; // with import

export function PlaceCard() {
  return (
    <div className='place-card'>
      <img className='vine' src={logo} alt='vine' />
      <h2 className='name'>Felicia Segui</h2>
    </div>
  );
}
