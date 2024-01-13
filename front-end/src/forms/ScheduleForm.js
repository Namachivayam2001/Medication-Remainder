import React, { useState } from 'react';
import './scheduleForm.css';
import axios from 'axios';
import Header from '../home-page/Header';

function ScheduleForm() {
   
    const [days, setDays] = useState('');  // Add this line
    const [hint, setHint] = useState(''); 
    const [daysError, setDaysError] = useState('');
    const [hintError, setHintError] = useState('');
    const [data, setData] = useState({
        time: '',
        days: '',
        hint: ''
    })

    const submit = async(e) => {

        try {
            const response = await axios.post('http://localhost:3030/schedule/form', data);
            console.log(response.data);
        } catch (error) {
            console.error('Error posting data:', error);
        }
        
    }
    
    const handleDaysChange = (event) => {
        const days = event.target.value;
        setDays(days);
        setDaysError(days < 1 || days > 100 ? 'Days must be 1 and 100' : '');
        if(!daysError){
            setData({...data, days: days});
        }
    };

    const handleHintChange = (event) => {
        const hint = event.target.value;
        setHint(hint);
        setHintError(hint.length < 1 || hint.length > 100 ? 'Hint must be 1 and 100 characters' : '');
        if(!hintError){
            setData({...data, hint: hint});
        }
    };

    return (
      <div className="container">
        <Header />
        <form 
            id="form" 
            onSubmit={(e) => submit(e)}
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
                        onChange={(e) => {setData({...data, time: e.target.value})}}
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
