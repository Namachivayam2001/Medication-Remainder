import { useUserContext } from '../userContext';
import React, { useEffect } from 'react';
import usePneumoniaForm from '../hooks/usePneumoniaForm';
import { useNavigate } from 'react-router-dom';
import './pneumoniaForm.css'
import Loading from '../utils/Loading';

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
        error,
        loading
    } = usePneumoniaForm();

    return(
        <div className="pneumoniaForm-container">
            <div className='err_and_inp_container'>
            <form className="pneumoniaForm" onSubmit={(e) => handleSubmit(e)}>
                <div id="fileUpload">
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                </div>
                <button type="submit">Upload</button>
            </form>
            {loading && <Loading />}
            {
                error
                    && <small id="pneumoniaError">{error}</small>
            }
            </div>
        </div>
    );
}

export default Pneumonia;