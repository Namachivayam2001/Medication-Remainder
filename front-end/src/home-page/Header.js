import {Link} from 'react-router-dom';

function Header() {
    return (
      <div className="navebar">
            <p>
                <Link to="/" >Medi Remind</Link>
            </p>
            <ul id="nav-right-icons">
                <li className="schedule-icon">
                    <Link to="/schedule/form" >Schedule</Link>
                </li>
                <li className="contact-icon">
                    <Link to="/schedule/data" >Account</Link>
                </li>
                <li className="login-icon">
                    <Link to="/login" >Login/Signup</Link>                        
                </li>
            </ul>
      </div>
    );
  }
  
  export default Header;
  