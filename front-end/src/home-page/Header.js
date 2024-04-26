import {Link} from 'react-router-dom';
import React, { useState } from 'react';

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
                <li>
                    <Link to="/schedule/data" onClick={closeDropdowns}>User Detials</Link>
                </li>
                <li>
                    <Link to="/schedule/form" onClick={closeDropdowns}>Schedule</Link>
                </li> 
                <li>
                    <Link to="/login" onClick={closeDropdowns}>Login</Link>
                </li>
                <li>
                    <Link to="/registor" onClick={closeDropdowns}>Register</Link>
                </li>
            </ul>
        )}
        {isFeatureOpen && (
            <ul className="Featuredropdown">
                <li>
                    <Link to="/obesity" onClick={closeDropdowns}><small>Check</small> Obesity Level</Link>
                </li>
                <li>
                    <Link to="/pneumonia" onClick={closeDropdowns}><small>Check</small> Pneumonia</Link>
                </li> 
                <li>
                    <Link to="/Diabetis" onClick={closeDropdowns}><small>Check</small> Diabetes</Link>
                </li>
            </ul>
        )}
        </>
    );
  }
  
  export default Header;
  