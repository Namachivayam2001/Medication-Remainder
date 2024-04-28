import {useState} from 'react';
import validate from '../utils/validateLoginForm';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../userContext';
import {jwtDecode} from 'jwt-decode'
import { toast } from 'react-toastify';

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

            if(localStorage.getItem('token')){
                toast.warn(`You'r already Login, Please Logout`)
                navigate('/schedule/data');
            } else if (Object.keys(validate(values)).length === 0) {
                const response = await axios.post('http://localhost:3030/users/login', values);
                if(response.data.status ===  'Login Fail'){
                    setErrors((prevErrors) => ({ ...prevErrors, email: 'incorrect Email or password please registor', password: 'incorrect Email or password please registor' }));
                    toast.error(' Login failed!');
                } else {
                    const token = response.data;
                    const userData = jwtDecode(token);
                    localStorage.setItem('token', JSON.stringify(token));

                    setUser((pre) => ({
                        ...pre, 
                        id: userData.id,
                        first_name: userData.first_name,
                        last_name: userData.last_name,
                        age: userData.age,
                        dob: userData.dob,
                        email: userData.email,
                        guardian_email: userData.guardian_email,
                        Obesity_level: userData.Obesity_level,
                        Pneumonia: userData.Pneumonia,
                        Diabetis: userData.Diabetis
                    }));
                    toast.success('Login successfully!');
                    navigate('/schedule/data');
                }
            } else {
                toast.warn('Invalid input!');
            }
        } catch (error) {
            console.error('Error posting data:', error);
            toast.info('Server error at Login!');
        }
    }

    return {
        values, 
        errors, 
        handleChange, 
        handleSubmit
    };
}