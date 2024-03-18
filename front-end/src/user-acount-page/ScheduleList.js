import React, { useEffect } from 'react';
import { FaToggleOn, FaToggleOff } from 'react-icons/fa6';
import Header from '../home-page/Header';
import './scheduleList.css';
import useList from '../hooks/useScheduleList';
import UserDetials from './UserDetials';

function ScheduleList() {   

    const { 
        handleToggle,
        handleDelete,
        fetchData,
        data,
        loading,
        error,
    } = useList();

    const tableName = data.length < 3 ? 'small-table' : 'large-table';

    /* Fetching the data from server when it renders */
    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return <p id ="loding">Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    
    return (
        <>
            <Header />
            <div 
                id="scheduleListContainer"
                className={tableName}
            >  
                <UserDetials/>
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
