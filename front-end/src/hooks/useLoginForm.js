import {useState} from 'react';

export default (validate) => {

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

    const handleSubmit = (e) => {
        try {
            e.preventDefault();
            setErrors(() => validate(values));
                             
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }

    return {values, errors, handleChange, handleSubmit};
}