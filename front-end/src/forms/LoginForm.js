import React, { useState } from 'react';
import './loginForm.css';
import Header from '../home-page/Header';
import { Link } from 'react-router-dom';

function LoginForm() {   
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleEmailChange = (e) => {
        const email = e.target.value;
        setEmail(email);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmailError(
            !emailRegex.test(email) 
            ? 'Invalid email' 
            : ''
        );
    }

    const handlePasswordChange = (e) => {
        const password = e.target.value;
        setPassword(password);
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        setPasswordError(
            !passwordRegex.test(password)
            ? 'use min 8 char and combination of 1-@-A-a'
            : ''
        );
    }

    return (
        <div className='login-container'>
            <Header />
            <form
                method='POST'
                className='login-form'
            >
                <h1 className='login-heading'>Login</h1>
                <div className='login-email-container'>
                    <label className='login-email-label'>Email*</label>
                    <input 
                        type='email'
                        value={email}
                        placeholder='Enter Email'
                        className='login-email-input'
                        onChange={(e) => handleEmailChange(e)}
                        style={{borderColor: emailError && 'red'}}
                        required
                    />
                    {emailError && <span className='login-error-message'>{emailError}</span>}
                </div>
                <div className='login-password-container'>
                    <lable className='login-password-label'>Password*</lable>
                    <input
                        type='password'
                        value={password}
                        placeholder='Enter Password'
                        className='login-password-input'
                        onChange={(e) => handlePasswordChange(e)}
                        style={{borderColor: passwordError && 'red'}}
                        required
                    />
                    {passwordError && <span className='login-error-message'>{passwordError}</span>}
                </div>
                <button
                    type='submit'
                    className='login-submit-button'
                >
                    Submit
                </button>
                <Link to='/registor'><small>Registor</small></Link>
                
            </form>
        </div>
    );
}
  
export default LoginForm;
