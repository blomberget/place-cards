import React from 'react';
import vine_png from '../assets/vine_copyright.png'; // with import

export function PlaceCard(props: { name: string }) {
  return (
    <div className='place-card'>
      <div className='backside'></div>
      <div className='front'>
        <img className='vine' src={vine_png} alt='vine' />
        <h2 className='name'>{props.name}</h2>
      </div>
    </div>
  );
}
