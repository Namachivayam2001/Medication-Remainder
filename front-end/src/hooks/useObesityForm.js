import {useState} from 'react';
import { useUserContext } from '../userContext';
import validate from '../utils/validateObesityForm';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

export default () => {

    const user_values = useUserContext();
    const {user, setUser} = user_values;

    const navigate = useNavigate() 

    const [errors, setErrors] = useState({});

    const [values, setValues] = useState({
        userId: user ? user.id : '',
        Age: user ? user.age : '',
        Gender: '',
        Height: '', 
        Weight: '',
        FCVC: '',
        NCP: '',
        FAF: '',
        CH2O: '',
        TUE: '',
        family_history_with_overweight: '',
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
                [name]: value.trim()
            });
        });        
    }

    const handleSubmit = async (e) => {
        try {
            console.log(' Obesity Submission start..........')
            e.preventDefault();
            setErrors(() => validate(values));
            console.log(errors)
            if (Object.keys(validate(values)).length === 0) {

                if(user){ 
                    // send the user data to predict obesity level
                    const response = await axios.post('http://localhost:5000/Obesity_level', {
                        data: values
                    });

                    const decodedData = jwtDecode(response.data);

                    // update the obesity level in the _users table
                    const db_response = await axios.put('http://localhost:3030/users/Obesity_level',{
                        headers: {
                            'token': `${JSON.parse(localStorage.getItem('token'))}`,
                            'Obesity_level': `${decodedData.prd_data}`
                        }
                    })                    

                    if(db_response.data.message === 'Obesity_level updated successfully'){
                        // set the Obesity level in user
                        setUser((pre) => {
                            return({
                                ...pre,
                                Obesity_level: decodedData.prd_data
                            })
                        }) 
                        alert('Obesity_level check successfully')
                        navigate('/schedule/data');
                    }
                } else {
                    alert("You'r not a login user. Please Login!" )
                    navigate('/login')
                }
                      
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