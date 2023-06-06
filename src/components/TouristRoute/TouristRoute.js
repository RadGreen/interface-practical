import { useState } from 'react';
import './TouristRoute.style.scss'

function TouristRoute(props) {
    const [isEditFieldVisible, setIsEditFieldVisible] = useState(false);
    const [editInputContent, setEditInputContent] = useState('');

    const { id, name, cost, startDate, endDate, deleteRoute, editRouteName } = props;

    const onDeleteButtonClick = () => {
        deleteRoute(id);
    }

    const onEditButtonClick = () => {
        setIsEditFieldVisible(!isEditFieldVisible);
    }

    const onEditInputChange = (e) => {
        setEditInputContent(e.target.value);
    }

    const onEditFormSubmit = (e) => {
        e.preventDefault();

        editRouteName(id, editInputContent);
        setIsEditFieldVisible(false);
    }

    const renderEditField = () => {

        if (!isEditFieldVisible) {
            return null;
        }

        return (
            <form
                className='TouristRoute-Form'
                onSubmit={onEditFormSubmit}
            >
                <label>
                    Edit route name
                    <input
                        value={editInputContent}
                        onChange={onEditInputChange}
                        type="text"
                    />
                </label>
                <button
                    className='TouristRoute-Button'
                    type='submit'
                >
                    Save new name
                </button>
            </form>
        )
    }

    return (
        <li className='TouristRoute'>
        <h2>{name}</h2>
        <p>Cost: {cost}</p>
        <p>Start date: {startDate}</p>
        <p>End date: {endDate}</p>
        { renderEditField() }
        <div className='TouristRoute-Actions'>
            <button
                className='TouristRoute-Button'
                onClick={onDeleteButtonClick}
            >
                Delete Route
            </button>
            <button
                className='TouristRoute-Button'
                onClick={onEditButtonClick}
            >
                Edit Route
            </button>
        </div>
        </li>
    );
};

export default TouristRoute;