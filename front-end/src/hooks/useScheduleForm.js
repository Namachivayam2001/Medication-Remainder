import {useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import validate from '../utils/validateScheduleForm';

export default () => {

    const navigate = useNavigate();

    const [values, setValues] = useState({
        time: '',
        days: '',
        hint: '',
        notification: true,
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const {value, name} = e.target;
        setValues((preValue) => {
            return({
                ...preValue,
                [name]: value,
            });
        });
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setErrors(() => validate(values));
            if (Object.keys(validate(values)).length === 0) {
                const scheduleInserted = await axios.post('http://localhost:3030/schedule/form', values);
                if(scheduleInserted.data.inserted){
                    alert('form submited successfully');
                    navigate('/schedule/data'); 
                } else {
                    alert('Schedule already exist, please Schedule a new one');
                }            
            }                 
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }

    return {handleChange, values, handleSubmit, errors};
}