import './loginForm.css';
import Header from '../home-page/Header';
import { Link } from 'react-router-dom';
import useForm from '../hooks/useLoginForm';

function LoginForm() {  

    const {values, errors, handleChange, handleSubmit} = useForm();

    return (
        <div className='login-container'>
            <Header />
            <form
                method='POST'
                className='login-form'
                onSubmit={(e) => handleSubmit(e)}
            >
                <h1 className='login-heading'>Login</h1>
                <div className='login-email-container'>
                    <label 
                        className='login-email-label'
                        htmlFor='email'
                    >
                        Email*
                    </label>
                    <input 
                        type='text'
                        name='email'
                        value={values.email}
                        placeholder='Enter Email'
                        className='login-email-input'
                        onChange={(e) => handleChange(e)}
                        style={{
                            borderColor: errors.email && 'red'
                        }}
                    />
                    {
                        errors.email 
                            && <span className='login-error-message'>{errors.email}</span>
                    }
                </div>
                <div className='login-password-container'>
                    <lable 
                        className='login-password-label'
                        htmlFor='password'
                    >
                        Password*
                    </lable>
                    <input
                        type='password'
                        name='password'
                        value={values.password}
                        placeholder='Enter Password'
                        className='login-password-input'
                        onChange={(e) => handleChange(e)}
                        style={{
                            borderColor: errors.password && 'red'
                        }}
                    />
                    {errors.password 
                        && <span className='login-error-message'>{errors.password}</span>
                    }
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
