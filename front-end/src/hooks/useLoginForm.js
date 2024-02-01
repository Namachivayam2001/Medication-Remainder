import {useState} from 'react';
import validate from '../utils/validateLoginForm';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../userContext';
import {jwtDecode} from 'jwt-decode'

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
                console.log(response);
                if(response.data.status ===  'Login Fail'){
                    setErrors((prevErrors) => ({ ...prevErrors, email: 'incorrect Email or password please registor', password: 'incorrect Email or password please registor' }));
                    
                } else {
                    const token = response.data;
                    const userId = jwtDecode(token);
                    console.log(userId)
                    localStorage.setItem('token', JSON.stringify(token));

                    setUser((pre) => ({...pre, userId: userId.userId}));
                    navigate('/');
                }
            }
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }

    return {values, errors, handleChange, handleSubmit};
}