import {useEffect, useState} from 'react'
import TouristRoute from '../TouristRoute';
import AuthForm from '../AuthForm';
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword  } from "firebase/auth";
import { ref, set, onValue, remove, update } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';
import { db, auth } from '../initFirebase';
import './TravelList.style.scss'

function TravelList() {
    const [routes, setRoutes] = useState([]);
    const [addInputContent, setAddInputContent] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (user) {
            const userId = user.uid;

            onValue(ref(db, `/${userId}`), (snapshot) => {
                const data = snapshot.val();
                if(data !== null ) {
                    setRoutes(Object.values(data));
                }
            })
        }
    }, [user])

    const deleteRoute = (id) => {
        if (user) {
            const userId = user.uid;
            remove(ref(db, `/${userId}/${id}`))
        }
    };

    const editRouteName = (id, newName) => {
        if (user) {
            const userId = user.uid;
            update(ref(db, `/${userId}/${id}`), {
                name: newName,
                id: id
            })
        }
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        if (user) {
            const userId = user.uid;
            const newRouteId = uuidv4();
            const newRoute = {
                id: newRouteId,
                name: addInputContent
            }
    
            if (newRoute.name) {
                set(ref(db, `/${userId}/${newRouteId}`), newRoute);
                setAddInputContent('');
            } else {
                alert('Please add a route name');
            }
        }
    }
    
    const onAddInputChange = (e) => {
        setAddInputContent(e.target.value);
    }

    const onLogin = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            setUser(userCredential.user);
        })
        .catch((error) => {
            alert(error.message);
        });
    }

    const onRegister = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        setUser(userCredential.user)
        }).catch((error) => {
            alert(error.message);
        })
    }

    const onSignOutButtonClick = () => {
        signOut(auth)
        setRoutes([]);
        setUser(null)
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
        <div className='TravelList'>
            <h1>Tourist Routes List</h1>
            { user 
                ? <button 
                    className='TravelList-Button'
                    onClick={onSignOutButtonClick}
                >
                    Sign Out
                </button> 
                : <AuthForm 
                    onLogin={onLogin}
                    onRegister={onRegister}
                /> }
            <ul>
                { user && theTravel() }
            </ul>
            { user && renderAdd() }
        </div >
    )
}

export default TravelList;