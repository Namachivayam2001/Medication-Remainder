import Home from './home-page/Home';
import {Routes, Route } from 'react-router-dom';
import './home.css';
import ScheduleForm from './forms/ScheduleForm';
import ScheduleList from './user-acount-page/ScheduleList';
import RegistorForm from './forms/RegistorForm';
import LoginForm from './forms/LoginForm';
import userContext from './userContext';
import { useEffect, useState } from 'react';

function App() {

    /* useEffect(() => {
        var [user, setUser] = useState(userContext);
        console.log(user);
    }, []); */

    return (
        <userContext.Provider >
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/schedule">
                    <Route path="form" element={<ScheduleForm />} />
                    <Route path="data" element={<ScheduleList />} />
                </Route>   
                <Route path="/registor" element={<RegistorForm />} />
                <Route path="/login" element={<LoginForm />} />         
            </Routes> 
        </userContext.Provider>             
    );
}

export default App;
