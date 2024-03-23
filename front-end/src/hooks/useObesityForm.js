import {useState} from 'react';
import { useUserContext } from '../userContext';
import validate from '../utils/validateObesityForm'
import axios from 'axios';

export default () => {

    const user_values = useUserContext();
    const {user, setUser} = user_values;

    const [errors, setErrors] = useState({});

    const [values, setValues] = useState({
        userId: user.id,
        Age: user.age,
        Gender: '',
        height: '',
        weight: '',
        FCVC: '',
        NCP: '',
        FAF: '',
        CH2O: '',
        TUE: '',
        family_history_with_over_weight: '',
        FAVC: '',
        SCC: '',
        CALC: '',
        CAEC: '',
        MTRANS: '',
        SMOKE: '',
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
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
            setErrors(() => validate(values));
            if (Object.keys(validate(values)).length === 0) {
                const response = await axios.post('http://localhost:5000/obesity', values);
                console.log(response);          
            } 
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }

    return {
        handleChange,
        handleSubmit,
        values,
        errors
    }
}