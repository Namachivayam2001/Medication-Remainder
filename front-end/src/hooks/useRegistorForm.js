import {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import validate from '../utils/validateRegistorForm'

export default () => {

    const navigate = useNavigate();

    const [values, setValues] = useState({
        first_name: '',
        last_name: '',
        dob: '',
        email: '',
        guardian_email: '',
        password: '',
        confirm_password: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const {name, value} = e.target;
        setValues((preValue) => {
            return({
                ...preValue,
                [name] : value,
            });
        });
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setErrors(() => validate(values));
            if (Object.keys(validate(values)).length === 0) {
                const response = await axios.post('http://localhost:3030/users/registor', values);
                console.log(response);
                if(response.data.email_repeat){
                    setErrors((prevErrors) => ({ ...prevErrors, email: 'Email already exist' }));
                } else {
                    alert('form submited successfully');
                    navigate('/schedule/data'); 
                }           
            } 
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }

    return {handleChange, values, handleSubmit, errors};
}