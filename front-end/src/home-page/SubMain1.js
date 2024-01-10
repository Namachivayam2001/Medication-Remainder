import React, { useEffect, useRef } from 'react';
import { MdOutlineStar } from "react-icons/md";

const iconStyle = {
    color: '#f9a100',
    fontSize: '15px',
};

function SubMain1() {
    const subNest1Ref = useRef(null);
    const subNest2Ref = useRef(null);
    
    useEffect(() => {
      // Get the dimensions of #sub-nest-1-1
      const subNest1 = subNest1Ref.current;
      const subNest1Width = subNest1.clientWidth;
      const subNest1Height = subNest1.clientHeight;
    
      // Set the dimensions of #sub-nest-1-2
      const subNest2 = subNest2Ref.current;
      if (subNest2) {
        subNest2.style.width = subNest1Width + 'px';
        subNest2.style.height = subNest1Height/5 + subNest1Height + 'px';
        subNest2.style.minWidth = subNest1Width - subNest1Width/3 + 'px';
        subNest2.style.minHeight = subNest1Height + 'px';
      }
    }, []); // Empty dependency array ensures this effect runs once after initial render    

    return (
        <div id="sub-container-1">
            <div id="sub-nest-1-2" ref={subNest2Ref}></div>
            <div id="sub-nest-1-1"  ref={subNest1Ref}>
                <h1>Never Miss a Dose Again</h1>
                <p>Stay on track with your medications using Medi Remind, the medication reminder application.</p>
                <button>Schedule</button>
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
        </div>           
    );
}
  
export default SubMain1;