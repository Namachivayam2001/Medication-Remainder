import React, { useState } from 'react';
import './scheduleForm.css';
import { useNavigate } from 'react-router-dom';

function ScheduleForm() {
    const navigate = useNavigate();

    const submit = () => {
        navigate('/');
    }

    const [days, setDays] = useState('');  // Add this line
    const [hint, setHint] = useState(''); 
    const [daysError, setDaysError] = useState('');
    const [hintError, setHintError] = useState('');

    const handleDaysChange = (event) => {
        const days = event.target.value;
        setDays(days);
        setDaysError(days < 1 || days > 100 ? 'Days must be 1 and 100' : '');
    };

    const handleHintChange = (event) => {
        const hint = event.target.value;
        setHint(hint);
        setHintError(hint.length < 1 || hint.length > 100 ? 'Hint must be 1 and 100 characters' : '');
    };
    return (
      <div className="container">
        <form 
            id="form" 
            action="/schedule-form-submit" 
            onSubmit={submit}
            method="POST"
        >
            <h1 className="form-items">schedule</h1>
            <div className="form-items">
                <div className="time">
                    <label>Time*</label>
                    <input 
                        type="time" 
                        id="timeInput" 
                        name="userTime" 
                        required 
                    />    
                </div>
                <div className="days">
                    <label>days*</label>                    
                    <input 
                        type="number" 
                        placeholder="number of days" 
                        id="userDays" 
                        name="userDays" 
                        required 
                        value={days}
                        onChange={(e) => handleDaysChange(e)}
                        style={{ borderColor: daysError ? 'red' : '', marginingBottom: daysError? 1: 0 }}
                    />
                    {daysError && <span id="error-message" className="error-message">{daysError}</span>}
                </div> 
            </div>
            <label className="form-items" style={{ marginTop: daysError ? 0 : 18 }} >Hint*</label>
            <input 
                className="form-items" 
                type="text" 
                id="hint" 
                name="hint" 
                placeholder="What you remember"
                required 
                value={hint}
                onChange={(e) => handleHintChange(e)}
                style={{ borderColor: hintError ? 'red' : ''}}
            />
                {hintError && <span className="error-message">{hintError}</span>}
            <button 
                className="form-items" 
                id="submit" 
                type="submit"
            >
                Submit
            </button>
        </form>
      </div>
    );
}
  
export default ScheduleForm;
