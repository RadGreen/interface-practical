import TouristRoute from '../TouristRoute';
import './MainContent.style.scss'

function MainContent() {
    return (
        <ul className='MainContent'>
            <h1>Tourist Routes List</h1>
            <TouristRoute
                name="Trip to Italy"
                cost='350 EUR' 
                startDate='05 June'
                endDate='15 June'
            />
            <TouristRoute
                name="Trip to Great Britain"
                cost='400 EUR' 
                startDate='14 June'
                endDate='23 June'
            />
            <TouristRoute
                name="Trip to Poland"
                cost='230 EUR' 
                startDate='08 June'
                endDate='17 June'
            />
        </ul>
    )
}

export default MainContent;