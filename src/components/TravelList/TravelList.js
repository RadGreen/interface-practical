import {useState} from 'react'
import TouristRoute from '../TouristRoute';
import './TravelList.style.scss'

function TravelList() {
    const [routes, setRoutes] = useState([
        { id:1, name: 'Trip to Italy', cost: '350 EUR', startDate: '05 June', endDate: '15 June' },
        { id:2, name: 'Trip to Great Britain', cost: '400 EUR', startDate: '14 June', endDate: '23 June' },
        { id:3, name: 'Trip to Poland', cost: '230 EUR', startDate: '08 June', endDate: '17 June' },
    ]);

    const deleteRoute = (id) => {
        setRoutes(routes.filter(route => route.id !== id));
    };

    const editRouteName = (id, newName) => {
        setRoutes(routes.map(route => {
            if (route.id === id) {
              return { ...route, name: newName };
            }
            return route;
          }));
    }

    const theTravel = () => {
        return routes.map((route) => (
            <TouristRoute
                key={route.id}
                id={route.id}
                name={route.name}
                cost={route.cost}
                startDate={route.startDate}
                endDate={route.endDate}
                deleteRoute={deleteRoute}
                editRouteName={editRouteName}
            />
        ))    
    }

    return (
        <ul className='TravelList'>
            <h1>Tourist Routes List</h1>
            { theTravel() }
        </ul>
    )
}

export default TravelList;