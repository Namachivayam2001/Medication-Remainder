import {Link} from 'react-router-dom';

function Header() {
    return (
      <div className="navebar">
            <p>
                <Link to="/" >Medi Remind</Link>
            </p>
            <ul id="nav-right-icons">
                    <li className="schedule-icon">
                        <Link to="/form/schedule" >Schedule</Link>
                    </li>
                    <li className="contact-icon">Contact</li>
                    <li className="login-icon">Login/Signup</li>
            </ul>
      </div>
    );
  }
  
  export default Header;
  