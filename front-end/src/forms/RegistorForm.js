import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './registorForm.css';
import Header from '../home-page/Header';

function RegistorForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLasttName] = useState('');
    const [userId, setUserId] = useState('');
    const [dob, setDOB] = useState('');
    const [email, setEmail] = useState('');
    const [guardianEmail, setGuardianEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleFirstName = (e) => {
        const first_name = e.target.value;
        setFirstName(first_name);
    }

    const handleLastName = (e) => {
        const last_name = e.target.value;
        setLasttName(last_name);
    }

    const handleUserId = (e) => {
        const userId = e.target.value;
        setUserId(userId);
    }

    const handleDOB = (e) => {
        const dob = e.target.value;
        setDOB(dob);
    }

    const handleEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    }

    const handleGuardianEmail = (e) => {
        const guardianEmail = e.target.value;
        setGuardianEmail(guardianEmail);
    }

    const handlePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    }

    const handleConfirmPassword = (e) => {
        const confirmPassword = e.target.value;
        setConfirmPassword(confirmPassword);
    }

    return (
        <div className='registorForm-container'>
            <Header />
            <form 
                className='registorForm'
                method='POST'
            >
                <h1 className='registorForm-heading'>Registor</h1>
                <div className='registorForm-name-container'>
                    <div className='registorForm-first-name-container'>
                        <label className='registorForm-first-name-label'>First Name*</label>
                        <input 
                            className='registorForm-first-name-input'
                            type='text'
                            value={firstName}
                            placeholder='Enter First Name'
                            onChange={(e) => handleFirstName(e)}
                            required
                        />
                    </div>
                    <div className='registorForm-last-name-container'>
                        <label className='registorForm-last-name-label'>Last Name*</label>
                        <input 
                            className='registorForm-last-name-input'
                            type='text'
                            value={lastName}
                            placeholder='Enter Last Name'
                            onChange={(e) => handleLastName(e)}
                            required
                        />
                    </div>
                </div>
                <div className='registorForm-user-id-dob-container'>
                    <div className='registorForm-user-id-container'>
                        <label className='registorForm-user-id-label'>User ID*</label>
                        <input 
                            className='registorForm-user-id-input'
                            type='text'
                            value={userId}
                            placeholder='Enter User Id'
                            onChange={(e) => handleUserId(e)}
                            required
                        />
                    </div>
                    <div className='registorForm-dob-container'>
                        <label className='registorForm-dob-label'>DOB*</label>
                        <input 
                            className='registorForm-dob-input'
                            type='date'
                            value={dob}
                            onChange={(e) => handleDOB(e)}
                            required
                        />
                    </div>
                </div>
                <div className='registorForm-email-container'>
                    <label className='registorForm-email-label'>Email*</label>
                    <input 
                        className='registorForm-email-input'
                        type='email'
                        value={email}
                        placeholder='Enter Email'
                        onChange={(e) => handleEmail(e)}
                        required
                    />
                </div>
                <div className='registorForm-guardian-email-container'>
                    <label className='registorForm-guardian-email-label'>Confirm Email*</label>
                    <input 
                        className='registorForm-guardian-email-input'
                        type='email'
                        value={guardianEmail}
                        placeholder='Enter Confirm Email'
                        onChange={(e) => handleGuardianEmail(e)}
                        required
                    />
                </div>
                <div className='registorForm-password-container'>
                    <label className='registorForm-password-label'>Password*</label>
                    <input 
                        className='registorForm-password-input'
                        type='password'
                        value={password}
                        placeholder='Enter Password'
                        onChange={(e) => handlePassword(e)}
                        required
                    />
                </div>
                <div className='registorForm-confirm-password-container'>
                    <label className='registorForm-confirm-password-label'>Confirm Password*</label>
                    <input 
                        className='registorForm-confirm-password-input'
                        type='password'
                        value={password}
                        placeholder='Enter Confirm Password'
                        onChange={(e) => handleConfirmPassword(e)}
                        required
                    />
                </div>
                <button 
                    className='registorForm-submit-button'
                    type='submit'
                >
                    Submit
                </button>
                <Link to='/login'><small>Login</small></Link>
            </form>
        </div>
    );
}
  
export default RegistorForm;
