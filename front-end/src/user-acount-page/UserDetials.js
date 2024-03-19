import React, {useState} from 'react';
import { useUserContext } from '../userContext';
import { useNavigate } from 'react-router-dom';
import FeatureDropDown from './FeatureDropDown';
import './userDetials.css';

const UserDetials = () => {
    const [dropDown, setDropDown] = useState(false);
    const toggleFeatures = () => {
        setDropDown(!dropDown);
    }

    const user_values = useUserContext();
    const {user, setUser} = user_values;
    const navigate = useNavigate()

    const date = new Date(user.dob);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 as getMonth() returns 0-based month
    const day = date.getDate().toString().padStart(2, '0');
    
    const logOut = (key) => {
        localStorage.removeItem(key);
        setUser(() => null);
        navigate('/');
    }

    return(
        <div className='userDetials'>
            <p id='user_name'><b>User Name : </b>{user.first_name} {user.last_name}</p>
            <p id='dob'><b>DOB : </b>{year}-{month}-{day}</p>
            <p id='email'><b>Email : </b>{user.email}</p>
            <p id='guardian_email'><b>Guardian Email : </b>{user.guardian_email}</p>
            <div className='features-login'>
                <div>
                    <button id='features' onClick={() => toggleFeatures()}>Features</button>
                    {dropDown && <FeatureDropDown/>}
                </div>
                <button id='logout' onClick={() => logOut('token')}>Logout</button>
            </div>
        </div>
    )
}

export default UserDetials;