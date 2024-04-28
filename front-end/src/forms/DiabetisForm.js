import { useUserContext } from '../userContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useForm from '../hooks/useDiabetisForm';
import Loading from '../utils/Loading';
import './diabetisForm.css'
import { toast } from 'react-toastify';

const DiabetisForm = () => {
    const navigate = useNavigate()
    const value = useUserContext();    
    const {user} = value;

    const {
        input, 
        error, 
        handleChange, 
        handleSubmit,
        loading
    } = useForm();

    useEffect(() => {
        if(!user){
            toast.info("You'r not a login user, Please Login!")
            navigate("/login")
        }
    }, []);

    return <div className="diabetis-container">
        {loading && <Loading />}
        <form 
            method="POST"
            className="diabetis-form"
            onSubmit={(e) => handleSubmit(e)}
        >
            <h1 className='diabetis-heading'>Diabetis Form</h1>
            <div className='diabetis-pregnancies-container'>
                <label 
                    className='diabetis-pregnancies-label'
                    htmlFor='Pregnancies'
                >
                    Pregnancies
                </label>
                <input 
                    type='number'
                    name='Pregnancies'
                    value={input.Pregnancies}
                    placeholder='Enter Pregnancies'
                    className='diabetis-pregnancie-input'
                    onChange={(e) => handleChange(e)}
                    style={{
                        borderColor: error.Pregnancie && 'red'
                    }}
                />
                {
                    error.Pregnancie 
                        && <span className='diabetis-error-message'>{error.Pregnancie}</span>
                }
            </div>
            <div className='diabetis-glucose-container'>
                <label 
                    className='diabetis-glucose-label'
                    htmlFor='Glucose'
                >
                    Glucose
                </label>
                <input 
                    type='number'
                    name='Glucose'
                    value={input.Glucose}
                    placeholder='Enter Glucose'
                    className='diabetis-glucose-input'
                    onChange={(e) => handleChange(e)}
                    style={{
                        borderColor: error.Glucose && 'red'
                    }}
                />
                {
                    error.Glucose 
                        && <span className='diabetis-error-message'>{error.Glucose}</span>
                }
            </div>
            <div className='diabetis-bloodPressure-container'>
                <label 
                    className='diabetis-bloodPressure-label'
                    htmlFor='BloodPressure'
                >
                    BloodPressure
                </label>
                <input 
                    type='number'
                    name='BloodPressure'
                    value={input.BloodPressure}
                    placeholder='Enter BloodPressure'
                    className='diabetis-bloodPressure-input'
                    onChange={(e) => handleChange(e)}
                    style={{
                        borderColor: error.BloodPressure && 'red'
                    }}
                />
                {
                    error.BloodPressure 
                        && <span className='diabetis-error-message'>{error.BloodPressure}</span>
                }
            </div>
            <div className='diabetis-skinThickness-container'>
                <label 
                    className='diabetis-skinThickness-label'
                    htmlFor='SkinThickness'
                >
                    SkinThickness
                </label>
                <input 
                    type='number'
                    name='SkinThickness'
                    value={input.SkinThickness}
                    placeholder='Enter SkinThickness'
                    className='diabetis-skinThickness-input'
                    onChange={(e) => handleChange(e)}
                    style={{
                        borderColor: error.SkinThickness && 'red'
                    }}
                />
                {
                    error.SkinThickness 
                        && <span className='diabetis-error-message'>{error.SkinThickness}</span>
                }
            </div>
            <div className='diabetis-insulin-container'>
                <label 
                    className='diabetis-insulin-label'
                    htmlFor='Insulin'
                >
                    Insulin
                </label>
                <input 
                    type='number'
                    name='Insulin'
                    value={input.Insulin}
                    placeholder='Enter Insulin'
                    className='diabetis-insulin-input'
                    onChange={(e) => handleChange(e)}
                    style={{
                        borderColor: error.Insulin && 'red'
                    }}
                />
                {
                    error.Insulin 
                        && <span className='diabetis-error-message'>{error.Insulin}</span>
                }
            </div>
            <div className='diabetis-BMI-container'>
                <label 
                    className='diabetis-BMI-label'
                    htmlFor='BMI'
                >
                    BMI
                </label>
                <input 
                    type='number'
                    name='BMI'
                    value={input.BMI}
                    placeholder='Enter BMI'
                    className='diabetis-BMI-input'
                    onChange={(e) => handleChange(e)}
                    style={{
                        borderColor: error.BMI && 'red'
                    }}
                />
                {
                    error.BMI 
                        && <span className='diabetis-error-message'>{error.BMI}</span>
                }
            </div>
            <div className='diabetis-DiabetesPedigreeFunction-container'>
                <label 
                    className='diabetis-DiabetesPedigreeFunction-label'
                    htmlFor='DiabetesPedigreeFunction'
                >
                    DiabetesPedigreeFunction
                </label>
                <input 
                    type='number'
                    name='DiabetesPedigreeFunction'
                    value={input.DiabetesPedigreeFunction}
                    placeholder='Enter DiabetesPedigreeFunction'
                    className='diabetis-DiabetesPedigreeFunction-input'
                    onChange={(e) => handleChange(e)}
                    style={{
                        borderColor: error.DiabetesPedigreeFunction && 'red'
                    }}
                />
                {
                    error.DiabetesPedigreeFunction 
                        && <span className='diabetis-error-message'>{error.DiabetesPedigreeFunction}</span>
                }
            </div>
                
                <button
                    type='submit'
                    className='login-submit-button'
                >
                    Submit
                </button>
            
        </form>
    </div>
}

export default DiabetisForm;