import {useState} from 'react'
import './TouristRoute.style.scss'

function TouristRoute(props) {

    
    const [isSelectRouteClicked, setIsSelectRouteClicked] = useState(false);
    const [isDeletRouteClicked, setIsDeletRouteClicked] = useState(false);

    const { name, cost, startDate, endDate } = props;

    function onSelectCheckboxClick() {
        setIsSelectRouteClicked(!isSelectRouteClicked)
    }

    function onDeleteCheckboxClick(){
        setIsDeletRouteClicked(!isDeletRouteClicked) 
    }

    return (
        <li className='TouristRoute'>
        <h2>{name}</h2>
        <p>Cost: {cost}</p>
        <p>Start date: {startDate}</p>
        <p>End date: {endDate}</p>
        <div className='TouristRoute-Actions'>
            <label>
                Select the route
                <input 
                    type='checkbox'
                    checked={isSelectRouteClicked}
                    onClick={onSelectCheckboxClick} 
                />
            </label>
            <label>
                Delete the route
                <input 
                    type='checkbox' 
                    checked={isDeletRouteClicked}
                    onClick={onDeleteCheckboxClick} 
                />
            </label>
        </div>
        </li>
    );
};

export default TouristRoute;