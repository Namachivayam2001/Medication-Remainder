import React from 'react';
import { useUserContext } from '../userContext';
import { useNavigate } from 'react-router-dom';
import './userDetials.css';

const UserDetials = () => {
    const user_values = useUserContext();
    const {user, setUser} = user_values;
    const navigate = useNavigate()

console.log(user)
    
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
            <p id='age'><b>Age : </b>{user.age}</p>
            <p id='dob'><b>DOB : </b>{year}-{month}-{day}</p>
            <p id='email'><b>Email : </b>{user.email}</p>
            <p id='guardian_email'><b>Guardian Email : </b>{user.guardian_email}</p>
            {
                user.Obesity_level
                    && <p id='Obesity_level'><b>Obesity_level : </b>{user.Obesity_level}</p>
            }
            <button id='logout' onClick={() => logOut('token')}>Logout</button>
        </div>
    )
}

export default UserDetials;