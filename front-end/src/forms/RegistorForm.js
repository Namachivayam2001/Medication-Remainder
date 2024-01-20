import { Link } from 'react-router-dom';
import './registorForm.css';
import Header from '../home-page/Header';
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
            <Header />
            <form 
                className='registorForm'
                method='POST'
                onSubmit={(e) => handleSubmit(e)}
            >
                <h1 className='registorForm-heading'>Registor</h1>
                <div className='registorForm-name-container'>
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
                                borderColor: errors.first_name ? 'red' : ''
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
                                borderColor: errors.last_name ? 'red' : ''
                            }}
                        />
                        {
                            errors.last_name
                                && <span className='registorForm-error-message'>{errors.last_name}</span>                        
                        }
                    </div>
                </div>
                <div className='registorForm-user-id-dob-container'>
                    <div className='registorForm-user-id-container'>
                        <label 
                            className='registorForm-user-id-label'
                            htmlFor='user_id'
                        >
                            User ID*
                        </label>
                        <input 
                            className='registorForm-user-id-input'
                            type='text'
                            name='user_id'
                            value={values.user_id}
                            placeholder='Enter User Id'
                            onChange={(e) => handleChange(e)}
                            style={{
                                borderColor: errors.user_id ? 'red' : ''
                            }}
                        />
                        {
                            errors.user_id
                                && <span className='registorForm-error-message'>{errors.user_id}</span>                        
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
                                borderColor: errors.dob ? 'red' : ''
                            }}
                        />
                        {
                            errors.dob
                                && <span className='registorForm-error-message'>{errors.dob}</span>                        
                        }
                    </div>
                </div>
                <div className='registorForm-mobile-number-container'>
                    <label 
                        className='registorForm-mobile-number-label'
                        htmlFor='mobile_number'
                    >
                        Moile Number*
                    </label>
                    <input 
                        className='registorForm-mobile-number-input'
                        type='tel'
                        name='mobile_number'
                        value={values.mobile_number}
                        placeholder='Enter Mobile Number'
                        onChange={(e) => handleChange(e)}
                        style={{
                            borderColor: errors.mobile_number ? 'red' : ''
                        }}
                    />
                    {
                        errors.mobile_number
                            && <span className='registorForm-error-message'>{errors.mobile_number}</span>                        
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
                            borderColor: errors.email ? 'red' : ''
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
                            borderColor: errors.guardian_email ? 'red' : ''
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
                            borderColor: errors.password ? 'red' : ''
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
                            borderColor: errors.confirm_password ? 'red' : ''
                        }}
                    />
                    {
                        errors.confirm_password
                            && <span className='registorForm-error-message'>{errors.confirm_password}</span>                        
                    }
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
