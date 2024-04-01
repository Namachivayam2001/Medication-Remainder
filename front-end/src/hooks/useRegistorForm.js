import {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import validate from '../utils/validateRegistorForm'

export default () => {

    const navigate = useNavigate(); 

    //calculate the age using DOB
    const calculateAge = (dob) => {
        const dobDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - dobDate.getFullYear();
        const monthDiff = today.getMonth() - dobDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
            age--;
        }
        return age;
    };

    //create the state of user detail
    const [values, setValues] = useState({
        first_name: '',
        last_name: '',
        dob: '',
        email: '',
        guardian_email: '',
        password: '',
        confirm_password: '',
        age: '',
    });

    const [errors, setErrors] = useState({});

    //handil the changes in the field of form
    const handleChange = (e) => {
        const {name, value} = e.target;
        setValues((preValue) => {
            return({
                ...preValue,
                [name] : value,
            });
        });
        if (values.dob) {
            // Calculate age if DOB is provided
            let age = null; // Initialize age as null
            age = calculateAge(values.dob).toString(); // Calculate age
            setValues((prevValues) => ({
                ...prevValues,
                age: age,
            }));
        }
    }

    //handil the submit with given details
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            setErrors(() => validate(values));

            if (Object.keys(validate(values)).length === 0) {
                const response = await axios.post('http://localhost:3030/users/registor', values);
                console.log('response recived in useRegistorForm...........');
                if(response.data.email_repeat){
                    setErrors((prevErrors) => ({ ...prevErrors, email: 'Email already exist' }));
                } else {
                    alert('form submited successfully');
                    navigate('/login'); 
                }           
            } 
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }

    //return the data to ObesityForm
    return {
        handleChange, 
        values, 
        handleSubmit, 
        errors
    };
}