import {useState} from 'react';

export default (validate) => {

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

    const handleSubmit = (e) => {
        try {
            e.preventDefault();
            setErrors(() => validate(values));
                             
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }

    return {handleChange, values, handleSubmit, errors};
}