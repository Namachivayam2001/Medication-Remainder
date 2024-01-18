import React, { useState } from 'react';
import './scheduleForm.css';
import axios from 'axios';
import Header from '../home-page/Header';
import { useNavigate } from 'react-router-dom';

function ScheduleForm() {
    const navigate = useNavigate();
    const [days, setDays] = useState('');  // Add this line
    const [hint, setHint] = useState(''); 
    const [daysError, setDaysError] = useState('');
    const [hintError, setHintError] = useState('');
    const [data, setData] = useState({
        time: '',
        days: '',
        hint: '',
        notification: true
    })

    /* handle form submition for post the data to server */
    const submit = async(e) => {
        try {
            e.preventDefault();
            const scheduleInserted = await axios.post('http://localhost:3030/schedule/form', data);
            if(scheduleInserted.data.inserted ){
                alert('form submited successfully')
            } else {
                alert('Schedule already exist, please Schedule a new one')
            }
        } catch (error) {
            console.error('Error posting data:', error);
        } finally {           
            navigate('/schedule/data');
        }
    }

    /* validate 1 <= days <= 100 */
    const handleDaysChange = (event) => {
        const days = event.target.value;
        setDays(days);
        setDaysError(days < 1 || days > 100 ? 'Days must be 1 and 100' : '');
        if(!daysError){
            setData({...data, days: days});
        }
    };
    
    /* hint 1 <= Char <= 100 */
    const handleHintChange = (event) => {
        const hint = event.target.value;
        setHint(hint);
        setHintError(hint.length < 1 || hint.length > 100 ? 'Hint must be 1 and 100 characters' : '');
        if(!hintError){
            setData({...data, hint: hint});
        }
    };

    return (
      <div className="schedule-form-container">
        <Header />
        <form 
            className="scheduleForm" 
            method="POST"
            onSubmit={submit}
        >
            <h1 className="scheduleForm-heading">schedule</h1>
            <div className="scheduleForm-time-days-container">
                <div className="scheduleForm-time-container">
                    <label>Time*</label>
                    <input 
                        type="time" 
                        className="scheduleForm-time-input" 
                        name="userTime" 
                        required 
                        onChange={(e) => {setData({...data, time: e.target.value})}}
                    />    
                </div>
                <div className="scheduleForm-days-container">
                    <label>days*</label>                    
                    <input 
                        type="number" 
                        placeholder="number of days" 
                        className="scheduleForm-days-input" 
                        required 
                        value={days}
                        onChange={(e) => handleDaysChange(e)}
                        style={{ borderColor: daysError ? 'red' : ''}}
                    />
                    {daysError && <span className="scheduleForm-error-message">{daysError}</span>}
                </div> 
            </div>
            <div className='scheduleForm-hint-container'>
                <label>Hint*</label>
                <input 
                    className="scheduleForm-hint-input" 
                    type="text" 
                    placeholder="What you remember"
                    required 
                    value={hint}
                    onChange={(e) => handleHintChange(e)}
                    style={{ borderColor: hintError ? 'red' : ''}}
                />
                    {hintError && <span className="scheduleForm-error-message">{hintError}</span>}
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
