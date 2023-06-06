import TouristRoute from '../TouristRoute';
import './TravelList.style.scss'

function TravelList() {
    const routes = [
        { name: 'Trip to Italy', cost: '350 EUR', startDate: '05 June', endDate: '15 June' },
        { name: 'Trip to Great Britain', cost: '400 EUR', startDate: '14 June', endDate: '23 June' },
        { name: 'Trip to Poland', cost: '230 EUR', startDate: '08 June', endDate: '17 June' },
    ];

    return (
        <ul className='TravelList'>
            <h1>Tourist Routes List</h1>
            {routes.map((route, index) => (
                <TouristRoute
                    key={index}
                    name={route.name}
                    cost={route.cost}
                    startDate={route.startDate}
                    endDate={route.endDate}
                />
            ))}
        </ul>
    )
}

export default TravelList;