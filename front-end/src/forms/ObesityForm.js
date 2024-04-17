import Header from '../home-page/Header';
import useObesityForm from '../hooks/useObesityForm';
import { useUserContext } from '../userContext';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ObesityForm = () => {

    const {
        handleChange,
        handleSubmit,
        values,
        errors
    } = useObesityForm();

    const navigate = useNavigate(); 
    const user_values = useUserContext();
    const {user} = user_values;

    useEffect(() => {
        if(!user){
            alert("You'r not a login user, Please Login!")
            navigate("/login")
        }
    }, []);
    return(
        <div className='obesityForm-container'>
            <form 
                className='registorForm'
                method='POST'
                onSubmit={(e) => handleSubmit(e)}
            >
                <div className='obes_height_div'>
                    <label 
                        className='obes_label'
                        id='obes_height_label'
                        htmlFor='height'
                    >
                        Height*
                    </label>
                    <input 
                        className='obes_input'
                        type='number'
                        value={values.Height}
                        name='Height'
                        placeholder='Enter the Height in cm'
                        onChange={(e) => handleChange(e)}
                        style={{
                            borderColor: errors.height && 'red',
                            boxShadow: errors.height && '0 0 5px rgba(225, 0, 0, 0.8)'
                        }}
                    />
                    {
                        errors.Height
                            && <span className='obes_error_msg'>{errors.Height}</span>                        
                    }
                </div>
                <div className='obes_weight_div'>
                    <label 
                        className='obes_label'
                        id='obes_weight_label'
                        htmlFor='weight'
                    >
                        Weight*
                    </label>
                    <input 
                        className='obes_input'
                        type='number'
                        value={values.Weight}
                        name='Weight'
                        placeholder='Enter the Weight'
                        onChange={(e) => handleChange(e)}
                        style={{
                            borderColor: errors.weight && 'red',
                            boxShadow: errors.weight && '0 0 5px rgba(225, 0, 0, 0.8)'
                        }}
                    />
                    {
                        errors.weight
                            && <span className='obes_error_msg'>{errors.weight}</span>                        
                    }
                </div>
                <div className='obes_FCVC_div'>
                    <label 
                        className='obes_label'
                        id='obes_FCVC_label'
                        htmlFor='FCVC'
                    >
                        FCVC*
                    </label>
                    <input 
                        className='obes_input'
                        type='number'
                        value={values.FCVC}
                        name='FCVC'
                        placeholder='vegetables intake in Kgs'
                        onChange={(e) => handleChange(e)}
                        style={{
                            borderColor: errors.FCVC && 'red',
                            boxShadow: errors.FCVC && '0 0 5px rgba(225, 0, 0, 0.8)'
                        }}
                    />
                    {
                        errors.FCVC
                            && <span className='obes_error_msg'>{errors.FCVC}</span>                        
                    }
                </div>
                <div className='obes_NCP_div'>
                    <label 
                        className='obes_label'
                        id='obes_NCP_label'
                        htmlFor='NCP'
                    >
                        NCP*
                    </label>
                    <input 
                        className='obes_input'
                        type='number'
                        value={values.NCP}
                        name='NCP'
                        placeholder='Number of Main Meals per day'
                        onChange={(e) => handleChange(e)}
                        style={{
                            borderColor: errors.NCP && 'red',
                            boxShadow: errors.NCP && '0 0 5px rgba(225, 0, 0, 0.8)'
                        }}
                    />
                    {
                        errors.NCP
                            && <span className='obes_error_msg'>{errors.NCP}</span>                        
                    }
                </div>
                <div className='obes_FAF_div'>
                    <label 
                        className='obes_label'
                        id='obes_FAF_label'
                        htmlFor='FAF'
                    >
                        FAF*
                    </label>
                    <input 
                        className='obes_input'
                        type='number'
                        value={values.FAF}
                        name='FAF'
                        placeholder='Physical activity hours per day'
                        onChange={(e) => handleChange(e)}
                        style={{
                            borderColor: errors.FAF && 'red',
                            boxShadow: errors.FAF && '0 0 5px rgba(225, 0, 0, 0.8)'
                        }}
                    />
                    {
                        errors.FAF
                            && <span className='obes_error_msg'>{errors.FAF}</span>                        
                    }
                </div>
                <div className='obes_CH2O_div'>
                    <label 
                        className='obes_label'
                        id='obes_CH2O_label'
                        htmlFor='CH2O'
                    >
                        CH2O*
                    </label> 
                    <input 
                        className='obes_input'
                        type='number'
                        value={values.CH2O}
                        name='CH2O'
                        placeholder='Water consumption per day'
                        onChange={(e) => handleChange(e)}
                        style={{
                            borderColor: errors.CH2O && 'red',
                            boxShadow: errors.CH2O && '0 0 5px rgba(225, 0, 0, 0.8)'
                        }}
                    />
                    {
                        errors.CH2O
                            && <span className='obes_error_msg'>{errors.CH2O}</span>                        
                    }
                </div>
                <div className='obes_TUE_div'>
                    <label 
                        className='obes_label'
                        id='obes_TUE_label'
                        htmlFor='TUE'
                    >
                        TUE*
                    </label> 
                    <input 
                        className='obes_input'
                        type='number'
                        value={values.TUE}
                        name='TUE'
                        placeholder='hours Using Technology per day'
                        onChange={(e) => handleChange(e)}
                        style={{
                            borderColor: errors.TUE && 'red',
                            boxShadow: errors.TUE && '0 0 5px rgba(225, 0, 0, 0.8)'
                        }}
                    />
                    {
                        errors.TUE
                            && <span className='obes_error_msg'>{errors.TUE}</span>                        
                    }
                </div>
                <div className='obes_Gender_div'>
                    <label 
                        className='obes_label'
                        id='obes_Gender_label'                    
                        htmlFor='Gender'
                    >
                        Gender*
                    </label>
                    <select 
                        className='obes_input'
                        id='obes_Gender_select'
                        name="Gender"             
                        value={values.Gender} 
                        onChange={(e) => handleChange(e)}
                        style={{
                            borderColor: errors.Gender && 'red',
                            boxShadow: errors.Gender && '0 0 5px rgba(225, 0, 0, 0.8)'
                        }}
                    >
                        <option value="">Select...</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    {
                        errors.Gender
                            && <span className='obes_error_msg'>{errors.Gender}</span>                        
                    }
                </div>
                <div className='obes_family_history_div'>
                    <label 
                        className='obes_label'
                        id='obes_family_history_label'                    
                        htmlFor='family_history_with_over_weight'
                    >
                        Family history with over weigh*
                    </label>
                    <select 
                        className='obes_input'
                        id='obes_family_history_select'
                        name="family_history_with_overweight"             
                        value={values.family_history_with_overweight} 
                        onChange={(e) => handleChange(e)}
                        style={{
                            borderColor: errors.family_history_with_over_weight && 'red',
                            boxShadow: errors.family_history_with_over_weight && '0 0 5px rgba(225, 0, 0, 0.8)'
                        }}
                    >
                        <option value="">Select...</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                    {
                        errors.family_history_with_over_weight
                            && <span className='obes_error_msg'>{errors.family_history_with_over_weight}</span>                        
                    }
                </div>
                <div className='obes_FAVC_div'>
                    <label 
                        className='obes_label'
                        id='obes_FAVC_label'                    
                        htmlFor='FAVC'
                    >
                        Frequent consumption of high caloric food*
                    </label>
                    <select 
                        className='obes_input'
                        id='obes_FAVC_select'
                        name="FAVC"             
                        value={values.FAVC} 
                        onChange={(e) => handleChange(e)}
                        style={{
                            borderColor: errors.FAVC && 'red',
                            boxShadow: errors.FAVC && '0 0 5px rgba(225, 0, 0, 0.8)'
                        }}
                    >
                        <option value="">Select...</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                    {
                        errors.FAVC
                            && <span className='obes_error_msg'>{errors.FAVC}</span>                        
                    }
                </div>
                <div className='obes_SCC_div'>
                    <label 
                        className='obes_label'
                        id='obes_SCC_label'                    
                        htmlFor='SCC'
                    >
                        Calories consumption monitoring*
                    </label>
                    <select 
                        className='obes_input'
                        id='obes_SCC_select'
                        name="SCC"             
                        value={values.SCC} 
                        onChange={(e) => handleChange(e)}
                        style={{
                            borderColor: errors.SCC && 'red',
                            boxShadow: errors.SCC && '0 0 5px rgba(225, 0, 0, 0.8)'
                        }}
                    >
                        <option value="">Select...</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                    {
                        errors.SCC
                            && <span className='obes_error_msg'>{errors.SCC}</span>                        
                    }
                </div>
                <div className='obes_CALC_div'>
                    <label 
                        className='obes_label'
                        id='obes_CALC_label'                    
                        htmlFor='CALC'
                    >
                        Consumption of Alcohol*
                    </label>
                    <select 
                        className='obes_input'
                        id='obes_CALC_select'
                        name="CALC"             
                        value={values.CALC} 
                        onChange={(e) => handleChange(e)}
                        style={{
                            borderColor: errors.CALC && 'red',
                            boxShadow: errors.CALC && '0 0 5px rgba(225, 0, 0, 0.8)'
                        }}
                    >
                        <option value="">Select...</option>
                        <option value="Sometimes">Sometimes</option>
                        <option value="Frequently">Frequently</option>                        
                        <option value="no">No</option>
                    </select>
                    {
                        errors.CALC
                            && <span className='obes_error_msg'>{errors.CALC}</span>                        
                    }
                </div>
                <div className='obes_CAEC_div'>
                    <label 
                        className='obes_label'
                        id='obes_CAEC_label'                    
                        htmlFor='CAEC'
                    >
                        Consumption of Food between Meals*
                    </label>
                    <select 
                        className='obes_input'
                        id='obes_CAEC_select'
                        name="CAEC"             
                        value={values.CAEC} 
                        onChange={(e) => handleChange(e)}
                        style={{
                            borderColor: errors.CAEC && 'red',
                            boxShadow: errors.CAEC && '0 0 5px rgba(225, 0, 0, 0.8)'
                        }}
                    >
                        <option value="">Select...</option>
                        <option value="Sometimes">Sometimes</option>
                        <option value="Frequently">Frequently</option>                        
                        <option value="no">No</option>
                        <option value="Always">Always</option>
                    </select>
                    {
                        errors.CAEC
                            && <span className='obes_error_msg'>{errors.CAEC}</span>                        
                    }
                </div>
                <div className='obes_MTRANS_div'>
                    <label 
                        className='obes_label'
                        id='obes_MTRANS_label'                    
                        htmlFor='MTRANS'
                    >
                        Mode of Transportation Used*
                    </label>
                    <select 
                        className='obes_input'
                        id='obes_MTRANS_select'
                        name="MTRANS"             
                        value={values.MTRANS} 
                        onChange={(e) => handleChange(e)}
                        style={{
                            borderColor: errors.MTRANS && 'red',
                            boxShadow: errors.MTRANS && '0 0 5px rgba(225, 0, 0, 0.8)'
                        }}
                    >
                        <option value="">Select...</option>
                        <option value="Bicycle">Bicycle</option>
                        <option value="Walking">Walking</option>                        
                        <option value="2 or 4 wheeler">2 or 4 wheeler</option>
                    </select>
                    {
                        errors.MTRANS
                            && <span className='obes_error_msg'>{errors.MTRANS}</span>                        
                    }
                </div>
                <div className='obes_SMOKE_div'>
                    <label 
                        className='obes_label'
                        id='obes_SMOKE_label'                    
                        htmlFor='SMOKE'
                    >
                        SMOKE*
                    </label>
                    <select 
                        className='obes_input'
                        id='obes_SMOKE_select'
                        name="SMOKE"             
                        value={values.SMOKE } 
                        onChange={(e) => handleChange(e)}
                        style={{
                            borderColor: errors.SMOKE  && 'red',
                            boxShadow: errors.SMOKE  && '0 0 5px rgba(225, 0, 0, 0.8)'
                        }}
                    >
                        <option value="">Select...</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                    {
                        errors.SMOKE 
                            && <span className='obes_error_msg'>{errors.SMOKE}</span>                        
                    }
                </div>
                <div className='submit-buttob-container'>
                    <button 
                        className='obesity-submit-button'
                        type='submit'
                    >
                        Submit
                    </button>
                </div>                 
            </form>
        </div>
    )
}

export default ObesityForm;