import './scheduleForm.css';
import Header from '../home-page/Header';
import useForm from '../hooks/useScheduleForm';
import { useUserContext } from '../userContext';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ScheduleForm() {

    const {
        handleChange, 
        values, 
        handleSubmit, 
        errors
    } = useForm();

    const navigate = useNavigate(); 
    const user_values = useUserContext();
    const {user} = user_values;

    useEffect(() => {
        if(!user){
            alert("You'r not a login user, Please Login!")
            navigate("/login")
        }
    }, []);

    return (
      <div className="schedule-form-container">
        <Header />
        <form 
            className="scheduleForm" 
            method="POST"
            onSubmit={(e) => handleSubmit(e)}
        >
            <h1 className="scheduleForm-heading">schedule</h1>
            <div className="scheduleForm-time-days-container">
                <div className="scheduleForm-time-container">
                    <label htmlFor='time'>Time*</label>
                    <input 
                        type="time" 
                        className="scheduleForm-time-input" 
                        name="time" 
                        value={values.time}
                        onChange={(e) => handleChange(e)}
                        style={{ borderColor: errors.time ? 'red' : ''}}
                    />   
                    {errors.time && <span className='scheduleForm-error-message'>{errors.time}</span>} 
                </div>
                <div className="scheduleForm-days-container">
                    <label htmlFor='days'>days*</label>                    
                    <input 
                        type="number" 
                        placeholder="number of days" 
                        className="scheduleForm-days-input" 
                        name='days'
                        value={values.days}
                        onChange={(e) => handleChange(e)}
                        style={{ borderColor: errors.days ? 'red' : ''}}
                    />
                    {errors.days && <span className='scheduleForm-error-message'>{errors.days}</span>} 
                </div> 
            </div>
            <div className='scheduleForm-hint-container'>
                <label htmlFor='hint'>Hint*</label>
                <input 
                    className="scheduleForm-hint-input" 
                    type="text" 
                    placeholder="What you remember"
                    name='hint'
                    value={values.hint}
                    onChange={(e) => handleChange(e)}
                    style={{ borderColor: errors.hint ? 'red' : ''}}
                />
                {errors.hint && <span className='scheduleForm-error-message'>{errors.hint}</span>} 
            </div>
            <button 
                className="scheduleForm-submit-button" 
                type="submit"
            >
                Submit
            </button>
        </form>
      </div>
    );
}
  
export default ScheduleForm;
