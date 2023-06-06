import {useState} from 'react'
import TouristRoute from '../TouristRoute';
import './TravelList.style.scss'

function TravelList() {
    const [routes, setRoutes] = useState([
        { id:1, name: 'Trip to Italy' },
        { id:2, name: 'Trip to Great Britain' },
        { id:3, name: 'Trip to Poland' },
    ]);
    const [addInputContent, setAddInputContent] = useState('')


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

    const onFormSubmit = (e) => {  
        e.preventDefault();
        const newRouteId = routes[routes.length - 1].id + 1;
        const newRoute = {
            id: newRouteId,
            name: addInputContent
        }

        setRoutes([...routes, newRoute])
        setAddInputContent('')
    }
    
    const onAddInputChange = (e) => {
        setAddInputContent(e.target.value);
    }

    const theTravel = () => {
        return routes.map((route) => (
            <TouristRoute
                key={route.id}
                id={route.id}
                name={route.name}
                deleteRoute={deleteRoute}
                editRouteName={editRouteName}
            />
        ))    
    }

    const renderAdd = () => {
        return (
            <form
                className='TravelList-Form'
                onSubmit={onFormSubmit}
            >
                <input
                    value={addInputContent}
                    onChange={onAddInputChange}
                    type="text"
                />
                <button
                    className='TravelList-Button'
                    type='submit'
                >
                    Add new route
                </button>
            </form>
        )
    }

    return (
        <ul className='TravelList'>
            <h1>Tourist Routes List</h1>
            { theTravel() }
            { renderAdd() }
        </ul>
    )
}

export default TravelList;