import {useState} from 'react';
import validate from '../utils/validateLoginForm';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default () => {

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
                    const { email, password, ...userData } = response.data.userRecord;
                    // Store user details in localStorage
                    localStorage.setItem('userEmail', email);
                    localStorage.setItem('userPassword', password);
                    localStorage.setItem('userData', JSON.stringify(userData));
                    navigate('/')
                } else if(response.data.match_email){
                    alert('wrong Password')
                }else{
                    alert('In-correct Email And Password')
                }
            }
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }

    return {values, errors, handleChange, handleSubmit};
}