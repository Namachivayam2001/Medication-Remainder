import {Link} from 'react-router-dom';
import React, { useState } from 'react';
import ReportGenerator from '../utils/ReportGenerator';

function Header() {

    const [isAcountOpen, setIsAcountOpen] = useState(false);
    const [isFeatureOpen, setIsFeatureOpen] = useState(false);
    
    const toggleAcountDropdown = () => {
        setIsAcountOpen(!isAcountOpen);
    };

    const toggleFeaturesDropdown = () => {
        setIsFeatureOpen(!isFeatureOpen);
    };

    const closeDropdowns = () => {
        setIsAcountOpen(false);
        setIsFeatureOpen(false);
    };

    return (
        <>
        <div className="navebar">
                <p>
                    <Link to="/" onClick={closeDropdowns}>Medi Remind</Link>
                </p>
                <ul id="nav-right-icons"> 
                    <li className="help-icon">
                        <Link to="/help">Help</Link>
                    </li>                                      
                    <li className="login-icon">
                        <div onClick={toggleAcountDropdown}>Account</div>                                            
                    </li>
                    <li className="features-icon">
                        <div onClick={toggleFeaturesDropdown}>Features</div> 
                    </li>
                </ul>
        </div>
        {isAcountOpen && (
            <ul className="dropdown">
                <li style={{fontSize: 'small'}}>
                    <Link to="/schedule/data" onClick={closeDropdowns}>User Detials</Link>
                </li>
                <li style={{fontSize: 'small'}}>
                    <Link to="/schedule/form" onClick={closeDropdowns}>Schedule</Link>
                </li> 
                <li style={{fontSize: 'small'}}>
                    <Link to="/login" onClick={closeDropdowns}>Login</Link>
                </li>
                <li style={{fontSize: 'small'}}>
                    <Link to="/registor" onClick={closeDropdowns}>Register</Link>
                </li>
            </ul>
        )}
        {isFeatureOpen && (
            <ul className="Featuredropdown">
                <li style={{fontSize: 'small'}}>
                    <Link to="/obesity" onClick={closeDropdowns}>Check Obesity </Link>
                </li>
                <li style={{fontSize: 'small'}}>
                    <Link to="/pneumonia" onClick={closeDropdowns}>Check Pneumonia</Link>
                </li> 
                <li style={{fontSize: 'small'}}>
                    <Link to="/Diabetis" onClick={closeDropdowns}>Check Diabetes</Link>
                </li>
                <li style={{fontSize: 'small'}} onClick={closeDropdowns}>
                    <ReportGenerator />
                </li>
            </ul>
        )}
        </>
    );
  }
  
  export default Header;
  