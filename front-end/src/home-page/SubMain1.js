import { MdOutlineStar } from "react-icons/md";
import { Link } from 'react-router-dom';

const iconStyle = {
    color: '#f9a100',
    fontSize: '15px',
};

function SubMain1() {   

    return (
        <div id="sub-container-1">
            <div id="sub-nest-1-1"  >
                <h1>Never Miss a Dose Again</h1>
                <p>Stay on track with your medications using Medi Remind, the medication reminder application.</p>
                <Link to="/schedule/form">
                    <button>Schedule</button>
                </Link>
                <div id="ratting">
                    <div id="stars">
                        <MdOutlineStar style={iconStyle} />
                        <MdOutlineStar style={iconStyle} />
                        <MdOutlineStar style={iconStyle} />
                        <MdOutlineStar style={iconStyle} />
                        <MdOutlineStar style={iconStyle} />
                    </div>
                    <p>
                        <span className="spn1">Personalized schedules</span>
                        <span className="spn1">Timely reminders</span>
                    </p>
                </div>
                <div id="review">
                    <img 
                        src={process.env.PUBLIC_URL + '/images/93697233-893x675.jpg'}
                        alt="reviewer pose" 
                    />
                    <div>
                        <h5>Medi Remind has made managing my medications so much easier.”</h5>
                        <p>Lillian Carter</p>
                    </div>
                </div>
            </div>
            <div id="sub-nest-1-2" ></div>
        </div>           
    );
}
  
export default SubMain1;