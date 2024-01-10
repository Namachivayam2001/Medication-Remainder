import React, { useEffect, useRef } from 'react';

function SubMain3() {
    const subNest1Ref = useRef(null);
    const subNest2Ref = useRef(null);
    
    useEffect(() => {
      // Get the dimensions of #sub-nest-2-1
      const subNest2 = subNest2Ref.current;
      const subNest2Width = subNest2.clientWidth;
      const subNest2Height = subNest2.clientHeight;
    
      // Set the dimensions of #sub-nest-2-2
      const subNest1 = subNest1Ref.current;
      if (subNest1) {
        subNest1.style.width = subNest2Width + 'px';
        subNest1.style.height = subNest2Height + subNest2Height + 'px';
        subNest2.style.minWidth = subNest2Width - subNest2Width/3 + 'px';
        subNest2.style.minHeight = subNest2Height/5 +subNest2Height + 'px';
      }
    }, []); // Empty dependency array ensures this effect runs once after initial render    

    return (   
        <div id="sub-container-3">
            <div id="sub-nest-3-1" ref={subNest1Ref}></div>
            <div id="sub-nest-3-2" ref={subNest2Ref}>
                <h1>
                    Set personalized medication schedules
                </h1>
                <p>
                    With Medi Remind, you can easily set personalized medication schedules based on your prescriptions. Never forget to take your medications again with our convenient reminders.
                </p>
            </div>
        </div>
    );
}
  
export default SubMain3;