import React, { useState, useEffect } from 'react';
import { FaToggleOn, FaToggleOff } from 'react-icons/fa6';
import axios from 'axios';
import Header from '../home-page/Header';
import './scheduleList.css';
import { useContext } from 'react';
import userContext from '../userContext';

function ScheduleList() {    
    
    const user_data = useContext(userContext);
    console.log(user_data)

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const tableName = data.length <= 6 ? 'small-table' : 'large-table';

    // Helper function to convert 24-hour time format to 12-hour time format
    const convertTo12HourFormat = (time24) => {
        const [hours, minutes] = time24.split(':');
        const suffix = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        return `${formattedHours}:${minutes} ${suffix}`;
    };
    
    /* Fetching the data from server when it renders */
    useEffect(() => {
        const fetchData = async () => {
            console.log('fetch')
            try {
                const response = await axios.get('http://localhost:3030/schedule/data');
                const formattedData = response.data.map(item => ({
                    ...item,
                    time: convertTo12HourFormat(item.time),
                }));
                setData(formattedData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching data. Please try again later.');
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <p id ="loding">Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    /* update the notification when it toggle */
    const handleToggle = async (itemId) => {
        try {
            const updatedData = data.map((item) => 
                item.id === itemId ? { ...item, notification: !item.notification } : item
            );
            setData(updatedData);
            await axios.put(`http://localhost:3030/schedule/data/${itemId}`);
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    /* Delete the records from ScheduleList */
    const handleDelete = async (itemId) => {
        try{
            const updatedData = data.filter((item) => 
                item.id !== itemId && item
            );
            setData(updatedData);
            await axios.delete(`http://localhost:3030/schedule/data/${itemId}`);
            alert('scheduel deleted successfully')
        } catch (error) {
            console.error('Error delete data: ', error)
        }
    }

    return (
        <>
            <Header />
            <div 
                id="scheduleListContainer"
                className={tableName}
            >  
                <h2>Your Schedule List</h2>
                <ul className="custom-list">
                    <li id="title">
                        <p className="time-head">Time</p>
                        <p className="days-head">Days</p>
                        <p className="hint-head">Hint</p>
                    </li>
                    {data.map((item) => (
                        <li 
                            key={item.id} 
                            className="list-items"
                        >
                            <p className="time">{item.time}</p>
                            <p className="days">{item.days}</p>
                            <p className="hint">                               
                                <div id="hint-left-div">
                                    {item.hint}
                                </div>
                                <div id="hint-right-div">
                                    <button 
                                        className="toggle-btn" 
                                        onClick={() => handleToggle(item.id)}
                                    >
                                        {item.notification ? <FaToggleOn /> : <FaToggleOff />}
                                    </button>
                                    <button 
                                        className="delete-btn" 
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        Delete                                    
                                    </button>
                                </div>
                            </p>    
                        </li>                        
                    ))}
                </ul>
            </div>
        </>
    );
}

export default ScheduleList;
