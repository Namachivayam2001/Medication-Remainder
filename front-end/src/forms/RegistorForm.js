import { Link } from 'react-router-dom';
import './registorForm.css';
import useForm from '../hooks/useRegistorForm';

function RegistorForm() {

    const {
        handleChange, 
        values, 
        handleSubmit, 
        errors
    } = useForm();

    return (
        <div className='registorForm-container'>
            <form 
                className='registorForm'
                method='POST'
                onSubmit={(e) => handleSubmit(e)}
            >
                <h1 className='registorForm-heading'>Registor</h1>
                <div className='registorForm-first-name-container'>
                    <label 
                        className='registorForm-first-name-label'
                        htmlFor='first_name'
                    >
                        First Name*
                    </label>
                    <input 
                        className='registorForm-first-name-input'
                        type='text'
                        value={values.first_name}
                        name='first_name'
                        placeholder='Enter First Name'
                        onChange={(e) => handleChange(e)}
                        style={{
                            borderColor: errors.first_name && 'red',
                            boxShadow: errors.first_name && '0 0 5px rgba(225, 0, 0, 0.8)'
                        }}
                    />
                    {
                        errors.first_name
                            && <span className='registorForm-error-message'>{errors.first_name}</span>                        
                    }
                </div>
                <div className='registorForm-last-name-container'>
                    <label 
                        className='registorForm-last-name-label'
                        htmlFor='last_name'
                    >
                        Last Name*
                    </label>
                    <input 
                        className='registorForm-last-name-input'
                        type='text'
                        name='last_name'
                        value={values.last_name}
                        placeholder='Enter Last Name'
                        onChange={(e) => handleChange(e)}
                        style={{
                            borderColor: errors.last_name && 'red',
                            boxShadow: errors.last_name && '0 0 5px rgba(225, 0, 0, 0.8)'

                        }}
                    />
                    {
                        errors.last_name
                            && <span className='registorForm-error-message'>{errors.last_name}</span>                        
                    }
                </div>
                <div className='registorForm-dob-container'>
                    <label 
                        className='registorForm-dob-label'
                        htmlFor='dob'
                    >
                        DOB*
                    </label>
                    <input 
                        className='registorForm-dob-input'
                        type='date'
                        name='dob'
                        value={values.dob}
                        onChange={(e) => handleChange(e)}
                        style={{
                            borderColor: errors.dob && 'red',
                            boxShadow: errors.dob && '0 0 5px rgba(225, 0, 0, 0.8)'
                        }}
                    />
                    {
                        errors.dob
                            && <span className='registorForm-error-message'>{errors.dob}</span>                        
                    }
                </div>
                <div className='registorForm-email-container'>
                    <label 
                        className='registorForm-email-label'
                        htmlFor='email'
                    >
                        Email*
                    </label>
                    <input 
                        className='registorForm-email-input'
                        type='text'
                        name='email'
                        value={values.email}
                        placeholder='Enter Email'
                        onChange={(e) => handleChange(e)}
                        style={{
                            borderColor: errors.email && 'red',
                            boxShadow: errors.email && '0 0 5px rgba(225, 0, 0, 0.8)'
                        }}
                    />
                    {
                        errors.email
                            && <span className='registorForm-error-message'>{errors.email}</span>                        
                    }
                </div>
                <div className='registorForm-guardian-email-container'>
                    <label 
                        className='registorForm-guardian-email-label'
                        htmlFor='guardian_email'
                    >
                        Guardian Email*
                    </label>
                    <input 
                        className='registorForm-guardian-email-input'
                        type='text'
                        name='guardian_email'
                        value={values.guardian_email}
                        placeholder='Enter Guardian Email'
                        onChange={(e) => handleChange(e)}
                        style={{
                            borderColor: errors.guardian_email && 'red',
                            boxShadow: errors.guardian_email && '0 0 5px rgba(225, 0, 0, 0.8)'
                        }}
                    />
                    {
                        errors.guardian_email
                            && <span className='registorForm-error-message'>{errors.guardian_email}</span>                        
                    }
                </div>
                <div className='registorForm-password-container'>
                    <label 
                        className='registorForm-password-label'
                        htmlFor='password'
                    >
                        Password*
                    </label>
                    <input 
                        className='registorForm-password-input'
                        type='password'
                        name='password'
                        value={values.password}
                        placeholder='Enter Password'
                        onChange={(e) => handleChange(e)}
                        style={{
                            borderColor: errors.password && 'red',
                            boxShadow: errors.password && '0 0 5px rgba(225, 0, 0, 0.8)'
                        }}
                    />
                    {
                        errors.password
                            && <span className='registorForm-error-message'>{errors.password}</span>                        
                    }
                </div>
                <div className='registorForm-confirm-password-container'>
                    <label 
                        className='registorForm-confirm-password-label'
                        htmlFor='confirm_password'
                    >
                        Confirm Password*
                    </label>
                    <input 
                        className='registorForm-confirm-password-input'
                        type='password'
                        name='confirm_password'
                        value={values.confirm_password}
                        placeholder='Enter Confirm Password'
                        onChange={(e) => handleChange(e)}
                        style={{
                            borderColor: errors.confirm_password && 'red',
                            boxShadow: errors.confirm_password && '0 0 5px rgba(225, 0, 0, 0.8)'
                        }}
                    />
                    {
                        errors.confirm_password
                            && <span className='registorForm-error-message'>{errors.confirm_password}</span>                        
                    }
                </div>
                <div className='registor-form-button-container'>
                <div className='submit-buttob-container'>
                    <button 
                        className='registorForm-submit-button'
                        type='submit'
                    >
                        Submit
                    </button>
                </div>                
                <div className='login-button-container'>
                    <Link to='/login'><button className='login-button'>Login</button></Link>                    
                </div> </div>               
            </form>
        </div>
    );
}
  
export default RegistorForm;
