import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './registorForm.css';
import Header from '../home-page/Header';

function RegistorForm() {
    const [firstName, setFirstName] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastName, setLastName] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [userId, setUserId] = useState('');
    const [userIdError, setUserIdError] = useState('');
    const [dob, setDOB] = useState('');
    const [email, setEmail] = useState('');
    const [guardianEmail, setGuardianEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleFirstName = (e) => {
        const first_name = e.target.value; 
        const firstNameRegex = /^[A-Za-z]+$/;
        if(firstNameRegex.test(first_name)){
            setFirstNameError('');
            setFirstName(first_name);
        }else{
            setFirstNameError('Use only alphabets');
        }
        
    }

    const handleLastName = (e) => {
        const last_name = e.target.value;
        const lastNameRegex = /^[A-Za-z]+$/;
        if(lastNameRegex.test(last_name)){
            setLastNameError('');
            setLastName(last_name);
        }else{
            setLastNameError('Use only alphabets');
        }
    }

    const handleUserId = (e) => {
        const userId = e.target.value;
        const userIdRegex = /^[A-Za-z][A-Za-z0-9]{7,}$/;
        if(userIdRegex.test(userId)){
            setUserIdError('');
            setUserId(userId);
        }else{
            setUserIdError('use minimu 7 char or userId already exist');
        }
    }

    const handleDOB = (e) => {
        const dob_value = e.target.value;
        const dob = new Date(dob_value);
        const currentDate = new Date();
        const minDate = new Date(
            currentDate.getFullYear() - 100, 
            currentDate.getMonth(), 
            currentDate.getDate()
        );
        const maxDate = new Date(
            currentDate.getFullYear() - 16, 
            currentDate.getMonth(), 
            currentDate.getDate()
        );
        if (dob >= minDate && dob <= maxDate) {
            setDOB(dob_value);
        }
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
                            style={{borderColor: firstNameError ? 'red' : ''}}
                            required
                        />
                        {firstNameError && <span className='registorForm-error-message'>{firstNameError}</span>}
                    </div>
                    <div className='registorForm-last-name-container'>
                        <label className='registorForm-last-name-label'>Last Name*</label>
                        <input 
                            className='registorForm-last-name-input'
                            type='text'
                            value={lastName}
                            placeholder='Enter Last Name'
                            onChange={(e) => handleLastName(e)}
                            style={{borderColor: lastNameError ? 'red' : ''}}
                            required
                        />
                        {lastNameError && <span className='registorForm-error-message'>{lastNameError}</span>}
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
                            style={{borderColor: userIdError ? 'red' : ''}}
                            required
                        />
                        {userIdError && <span className='registorForm-error-message'>{userIdError}</span>}
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
                    <label className='registorForm-guardian-email-label'>Guardian Email*</label>
                    <input 
                        className='registorForm-guardian-email-input'
                        type='email'
                        value={guardianEmail}
                        placeholder='Enter Guardian Email'
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
                        value={confirmPassword}
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
