import {useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import validate from '../utils/validateScheduleForm';
import {useUserContext} from '../userContext';

export default () => {

    const navigate = useNavigate();
    const user_values = useUserContext();
    const {user, setUser} = user_values;

    const [values, setValues] = useState({
        user_id: user.userId,
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
                const response = await axios.post('http://localhost:3030/schedule/form', values);
                if(response.data.inserted){
                    setUser(user);
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