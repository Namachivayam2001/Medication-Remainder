import {useState} from 'react';
import validate from '../utils/validateLoginForm';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../userContext';
import {jwtDecode} from 'jwt-decode'

export default () => {
    const value = useUserContext();
    const {user, setUser} = value;

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

            if (Object.keys(validate(values)).length === 0 && user === null) {
                const response = await axios.post('http://localhost:3030/users/login', values);
                if(response.data.status ===  'Login Fail'){
                    setErrors((prevErrors) => ({ ...prevErrors, email: 'incorrect Email or password please registor', password: 'incorrect Email or password please registor' }));
                    
                } else {
                    const token = response.data;
                    const userData = jwtDecode(token);
                    localStorage.setItem('token', JSON.stringify(token));

                    setUser((pre) => ({
                        ...pre, 
                        id: userData.id,
                        dob: userData.dob,
                        email: userData.email,
                        first_name: userData.first_name,
                        guardian_email: userData.guardian_email,
                        last_name: userData.last_name,
                        age: userData.age,
                        Obesity_level: userData.Obesity_level
                    }));
                    navigate('/');
                }
            } else {
                alert('your alredy login please logout and then login another accout');
                navigate('/schedule/data')
            }
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }

    return {
        values, 
        errors, 
        handleChange, 
        handleSubmit
    };
}