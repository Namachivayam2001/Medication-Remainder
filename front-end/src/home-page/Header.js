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

    return (
        <>
        <div className="navebar">
                <p>
                    <Link to="/" >Medi Remind</Link>
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
                    <Link to="/schedule/data" >User Detials</Link>
                </li>
                <li>
                    <Link to="/schedule/form" >Schedule</Link>
                </li> 
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/registor">Register</Link>
                </li>
            </ul>
        )}
        {isFeatureOpen && (
            <ul className="Featuredropdown">
                <li>
                    <Link to="/obesity" ><small>Add/Eddit</small> Obesity Level</Link>
                </li>
                <li>
                    <Link to="" >Feature 2</Link>
                </li> 
                <li>
                    <Link to="">Feature 2</Link>
                </li>
            </ul>
        )}
        </>
    );
  }
  
  export default Header;
  