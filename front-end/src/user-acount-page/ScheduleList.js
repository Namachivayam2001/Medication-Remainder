import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../home-page/Header';
import './scheduleList.css'

function ScheduleList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3030/schedule/data');
                setData(response.data);
                console.log(data)
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching data. Please try again later.');
            } finally {
              setLoading(false);
            }
        };

        fetchData();
    }, []);
    
    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
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
                            </>               
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default ScheduleList;
