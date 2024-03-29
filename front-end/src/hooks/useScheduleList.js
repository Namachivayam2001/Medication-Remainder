import { useState } from "react";
import axios from "axios";
import { useUserContext } from '../userContext';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom"; 

export default () =>  {

    const user_values = useUserContext();
    const {user} = user_values;

    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Helper function to convert 24-hour time format to 12-hour time format
    const convertTo12HourFormat = (time24) => {
        const [hours, minutes] = time24.split(':');
        const suffix = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        return `${formattedHours}:${minutes} ${suffix}`;
    };

    /* update the notification when it toggle */
    const handleToggle = async (itemId) => {
        await axios.put('http://localhost:3030/schedule/data',{
            headers: {
                'token': `${JSON.parse(localStorage.getItem('token'))}`,
                'itemId': `${itemId}`
            }
        }).then(res => {
            const token = res.data;
            const decoded_data = jwtDecode(token);
            const formattedData = decoded_data.togeled_data.map(item => ({
                ...item,
                time: convertTo12HourFormat(item.time),
            }));
            setData(formattedData);
        }).catch (error => {
            console.error('Error updating data:', error);
        })
    };

    /* Delete the records from ScheduleList */
    const handleDelete = async (itemId) => {
             
        await axios.delete(`http://localhost:3030/schedule/data`,{
            headers: {
                'token': `${JSON.parse(localStorage.getItem('token'))}`,
                'itemId': `${itemId}`
            }
        }).then(res => {
            const token = res.data;
            const decoded_data = jwtDecode(token);
            const formattedData = decoded_data.remaining_data.map(item => ({
                ...item,
                time: convertTo12HourFormat(item.time),
            }));
            setData(formattedData);
        }).catch (error => {
            console.error('Error delete data: ', error);
        });
    }

    const fetchData = async () => {
        if(user != null){
            await axios.get(`http://localhost:3030/schedule/data`, {
                headers: {
                    'token': `${JSON.parse(localStorage.getItem('token'))}`
                }
            }).then(res => {
                const token = res.data;
                const decoded_data = jwtDecode(token);
                const formattedData = decoded_data.schedules.map(item => ({
                    ...item,
                    time: convertTo12HourFormat(item.time),
                }));
                setData(formattedData)
                setLoading(false);
            }).catch (error => {
                console.error('Error fetching data:', error);
                setLoading(false);
                setError('Error fetching data. Please try again later.');
            })
        } else {
            setLoading(false);
            alert('Please Login');
            navigate('../../login');
        }
        
    };

    return {
        handleToggle,
        handleDelete,
        fetchData,
        data,
        loading,
        error, 
        user
    };
}
