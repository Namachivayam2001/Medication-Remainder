import React, { useEffect } from 'react';
import { FaToggleOn, FaToggleOff } from 'react-icons/fa6';
import './scheduleList.css';
import useList from '../hooks/useScheduleList';
import UserDetials from './UserDetials';
import Loading from '../utils/Loading';
import { useUserContext } from '../userContext';
import { useNavigate } from "react-router-dom"; 
import { toast } from 'react-toastify';

function ScheduleList() {   

    const { 
        handleToggle,
        handleDelete,
        fetchData,
        data,
        loading,
    } = useList();

    const navigate = useNavigate();
    const user_values = useUserContext();
    const {user} = user_values;
    const tableName = (data.length > 2 && Object.keys(user).length > 6) ? 'large-table' : 'small-table' ;

    /* Fetching the data from server when it renders */
    useEffect(() => {
        if(!user){
            toast.info("You'r not a login user, Please Login!");
            navigate("/login")
        }else{
            fetchData();
        }        
    }, []);
    
    return (
        <>
            <div 
                id="scheduleListContainer"
                className={tableName}
            >  
                {user && <UserDetials/>}
                {loading && <Loading />}
                <h2>Your Schedule List</h2>
                <ul className="custom-list">
                    <li id="title">
                        <p className="time-head">Time</p>
                        <p className="days-head">Days</p>
                        <p className="hint-head">Hint</p>
                        <p className="action-head">Action</p>
                    </li>
                    {data && data.map((item) => (
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
