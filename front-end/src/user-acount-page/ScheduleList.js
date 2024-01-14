import React, { useState, useEffect } from 'react';
import { FaToggleOn, FaToggleOff } from 'react-icons/fa6';
import axios from 'axios';
import Header from '../home-page/Header';
import './scheduleList.css'

function ScheduleList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /* Fetching the data from server when it renders */
    useEffect(() => {
        const fetchData = async () => {
            console.log('fetch')
            try {
                const response = await axios.get('http://localhost:3030/schedule/data');
                setData(response.data);
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
            console.log('data deleted')
        } catch (error) {
            console.error('Error delete data: ', error)
        }
    }

    return (
        <>
            <Header />
            <div id="scheduleListContainer">  
                <h2>Your Schedule List</h2>
                <ul className="custom-list">
                    <li id="title">
                        <span className="time">Time</span>
                        <span className="days">Days</span>
                        <span className="hint">Hint</span>
                    </li>
                    {data.map((item) => (
                        <li 
                            key={item.id} 
                        >
                            <>
                                <span className="time">{item.time}</span>
                                <span className="days">{item.days}</span>
                                <span className="hint">{item.hint}</span>
                                <button onClick={() => handleToggle(item.id)}>
                                    {item.notification ? <FaToggleOn /> : <FaToggleOff />}
                                </button>
                                <button onClick={() => handleDelete(item.id)}>Delete</button>
                            </>               
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default ScheduleList;
