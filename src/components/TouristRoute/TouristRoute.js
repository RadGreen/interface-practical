import React from 'react';
import './TouristRoute.style.scss'

function TouristRoute(props) {
  const { name, cost, startDate, endDate } = props;

  return (
    <li className='TouristRoute'>
      <h2>{name}</h2>
      <p>Cost: {cost}</p>
      <p>Start date: {startDate}</p>
      <p>End date: {endDate}</p> 
    </li>
  );
};

export default TouristRoute;