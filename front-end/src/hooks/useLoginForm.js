import {useState} from 'react';
import validate from '../utils/validateLoginForm';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../userContext';

export default () => {
    const value = useUserContext();
    const {setUser} = value;

    const navigate = useNavigate()

    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const {name, value} = e.target;
        setValues((preValue) => {
            return({
                ...preValue,
                [name]: value,
            });
        });
    } 

    const handleSubmit = async(e) => {
        try {
            e.preventDefault();
            setErrors(() => validate(values));

            if (Object.keys(validate(values)).length === 0) {
                const response = await axios.post('http://localhost:3030/users/login', values);
                if(response.data.status ===  'Login successful'){
                    const userData = response.data.userRecord;
                    // Store user details in localStorage
                    localStorage.setItem('userData', JSON.stringify(userData));
                    setUser(userData);
                    navigate('/')
                } else if(response.data.match_email){
                    setErrors((prevErrors) => ({ ...prevErrors, password: 'Password incorrect' }));
                }else{
                    setErrors((prevErrors) => ({ ...prevErrors, email: 'incorrect Email and password please registor', password: 'incorrect Email and password please registor' }));
                }
            }
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }

    return {values, errors, handleChange, handleSubmit};
}