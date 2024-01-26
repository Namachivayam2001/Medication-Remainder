import Home from './home-page/Home';
import {Routes, Route } from 'react-router-dom';
import './home.css';
import ScheduleForm from './forms/ScheduleForm';
import ScheduleList from './user-acount-page/ScheduleList';
import RegistorForm from './forms/RegistorForm';
import LoginForm from './forms/LoginForm';
import {userContext} from './userContext';
import { useState } from 'react';

function App() {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('userData')));

    return (
        <userContext.Provider value={{user, setUser}}>
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
