import {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default (validate) => {

    const navigate = useNavigate();

    const [values, setValues] = useState({
        first_name: '',
        last_name: '',
        user_id: '',
        dob: '',
        mobile_number: '',
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
                const userInserted = await axios.post('http://localhost:3030/users/registor', values);
                if(userInserted.data.inserted){
                    alert('form submited successfully');
                    navigate('/schedule/data'); 
                } else {
                    alert('userID or email are already exist, Registration failed!');
                }            
            } 
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }

    return {handleChange, values, handleSubmit, errors};
}