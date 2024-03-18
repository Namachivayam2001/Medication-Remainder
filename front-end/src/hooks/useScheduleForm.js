import {useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import validate from '../utils/validateScheduleForm';
import {useUserContext} from '../userContext';

export default () => {

    const navigate = useNavigate();
    const user_values = useUserContext();
    const {user} = user_values;

    const [values, setValues] = useState({
        user_id: user ? user.id : '',
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
            setErrors(() => validate(values, user));
            if (Object.keys(validate(values)).length === 0) {
                const response = await axios.post('http://localhost:3030/schedule/form', {
                    headers: {
                        'token': `${JSON.parse(localStorage.getItem('token'))}`,
                        'values': `${JSON.stringify(values)}`
                    }
                });
                if(response.data.repeat === true){
                    alert('schedule already exist at same time')
                } if(response.data.inserted){
                    //setUser(user);
                    alert('form submited successfully');
                    navigate('/schedule/data'); 
                }            
            }                 
        } catch (error) {
            alert('you are not a authorized user please login');
            navigate('/login'); 
            console.error('Error posting data:', error);
        }
    }

    return {
        handleChange, 
        values, 
        handleSubmit, 
        errors,
        user
    };
}