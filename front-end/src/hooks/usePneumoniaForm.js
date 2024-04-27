import { useState } from "react";
import axios from "axios";
import validatePneumoniaForm from "../utils/validatePneumoniaForm";
import { useUserContext } from "../userContext";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const usePneumoniaForm = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const user_val = useUserContext();
    const {setUser} = user_val;

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError(() => validatePneumoniaForm(file));
        
        const formData = new FormData(); 
        formData.append('image', file);
        
        if(!error){
            try {
                setLoading(true); // Set loading to true while data is being received
                
                const response = await axios.post('http://localhost:5000/pneumonia', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                // decode the token from pyton server
                const decodedData = jwtDecode(response.data);

                // update the Pneumonia in the _users table
                const db_response = await axios.put('http://localhost:3030/users/pneumonia',{
                    headers: {
                        'token': `${JSON.parse(localStorage.getItem('token'))}`,
                        'pneumonia': `${decodedData.prd_class}`
                    }
                })
                                   
                if(db_response.data.message === 'pneumonia updated successfully'){
                    // set the Pneumonia in user
                    setUser((pre) => {
                        return({
                            ...pre,
                            Pneumonia: decodedData.prd_class
                        })
                    })
                    alert("Check Pneumonia sucessfully")
                    setLoading(false); // Set loading to false after data is received
                    console.log('Pneumonia updated successfully...........')
                    navigate('/schedule/data');
                }

            } catch (error) {
                console.error('Error uploading image:', error);
            } 
        }
    };

    return {
        handleFileChange,
        handleSubmit,
        error,
        loading
    };
}

export default usePneumoniaForm;
