import { useState } from "react";
import axios from "axios";
import validatePneumoniaForm from "../utils/validatePneumoniaForm";

const usePneumoniaForm = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);

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
                const response = await axios.post('http://localhost:5000/pneumonia', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log(response.data);
                // Redirect or handle response data as needed
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };

    return {
        handleFileChange,
        handleSubmit,
        error
    };
}

export default usePneumoniaForm;
