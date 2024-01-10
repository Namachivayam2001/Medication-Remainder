import Home from './home-page/Home';
import {Routes, Route } from 'react-router-dom';
import './home.css';
import ScheduleForm from './forms/ScheduleForm';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/form">
                <Route path="schedule" element={<ScheduleForm />} />
            </Route>
        </Routes>       
    );
}

export default App;
