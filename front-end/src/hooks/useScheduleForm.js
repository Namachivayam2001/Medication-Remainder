import {useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import validate from '../utils/validateScheduleForm';
import {useUserContext} from '../userContext';
import { toast } from 'react-toastify';

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
        e.preventDefault();
        setErrors(() => validate(values, user));
        if (Object.keys(validate(values)).length === 0) {
            try{
                const response = await axios.post('http://localhost:3030/schedule/form', {
                    headers: {
                        'token': `${JSON.parse(localStorage.getItem('token'))}`,
                        'values': `${JSON.stringify(values)}`
                    }
                });
                if(response.data.repeat === true){
                    toast.warn('Schedule already exist!');
                } 
                if(response.data.inserted){
                    toast.success('Schedule added successfully!');
                    navigate('/schedule/data'); 
                } 
            } catch (error) {
                console.error('Error posting data:', error);
                toast.error('Server error at Schedule notification!');
            }         
        } else {
            toast.warn('Invalid input!');
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