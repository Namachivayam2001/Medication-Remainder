import {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'
import { useUserContext } from '../userContext';
import validate from '../utils/validateDiabetisForm'

export default () => {

    const navigate = useNavigate()    
    const value = useUserContext();    
    const {user, setUser} = value;

    const [input, setInput] = useState({
        Age: user ? user.age : '',
    });
    const [error, setError] = useState({})

    const handleChange = (e) => {
        const {name, value} = e.target;
        setInput((pre) => {
            return({
                ...pre,
                [name]: value,
            })
        })
    }

    const handleSubmit = async (e) => {
        try {
            console.log('Diabetis Submission start..........')
            e.preventDefault();
            setError(() => validate(input));
            if (Object.keys(validate(input)).length === 0) {

                // send the user data to predict obesity level
                const response = await axios.post('http://localhost:5000/Diabetis', {
                    data: input
                });
                const decodedData = jwtDecode(response.data);

                // set the Obesity level in user
                setUser((pre) => {
                    return({
                        ...pre,
                        Diabetis: decodedData.prd_class
                    })
                })

                // update the diabetis in the _users table
                const db_response = await axios.put('http://localhost:3030/users/Diabetis',{
                    headers: {
                        'token': `${JSON.parse(localStorage.getItem('token'))}`,
                        'Diabetis': `${decodedData.prd_class}`
                    }
                })

                if(db_response.data.message === 'Diabetis updated successfully'){
                    alert('Diabetis updated successfully')
                    navigate('/schedule/data');
                }                      
            } 
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }

    return {
        input,
        error,
        handleChange,
        handleSubmit
    }
}