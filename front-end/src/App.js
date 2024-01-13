import Home from './home-page/Home';
import {Routes, Route } from 'react-router-dom';
import './home.css';
import ScheduleForm from './forms/ScheduleForm';
import ScheduleList from './user-acount-page/ScheduleList';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/schedule">
                <Route path="form" element={<ScheduleForm />} />
                <Route path="data" element={<ScheduleList />} />
            </Route>            
        </Routes>       
    );
}

export default App;
