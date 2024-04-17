import Header from '../home-page/Header';
import { useUserContext } from '../userContext';
import React, { useEffect } from 'react';
import usePneumoniaForm from '../hooks/usePneumoniaForm';
import { useNavigate } from 'react-router-dom';
import './pneumoniaForm.css'

const Pneumonia = () => {

    const navigate = useNavigate();
    const user_values = useUserContext();
    const {user} = user_values;

    useEffect(() => {
        if(!user){
            alert("You'r not a login user, Please Login!")
            navigate("/login")
        }
    }, []);

    const {
        handleSubmit,
        handleFileChange,
        error
    } = usePneumoniaForm();

    return(
        <div className="pneumoniaForm-container">
            <form className="pneumoniaForm" onSubmit={(e) => handleSubmit(e)}>
                <div id="fileUpload">
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                    {
                        error
                            && <small id="pneumoniaError">{error}</small>
                    }
                </div>
                <button type="submit">Upload</button>
            </form>
        </div>
    );
}

export default Pneumonia;