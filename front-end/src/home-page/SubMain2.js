import React, { useEffect, useRef } from 'react';

function SubMain2() {
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
        subNest1.style.height = subNest2Height/2 + subNest2Height + 'px';
        subNest2.style.minWidth = subNest2Width - subNest2Width/3 + 'px';
        subNest2.style.minHeight = subNest2Height + 'px';
      }
    }, []); // Empty dependency array ensures this effect runs once after initial render    

    return (
        <div id="sub-container-2">
            <div id="sub-nest-2-2" ref={subNest2Ref}>
                <h1>Track your medication history</h1>
                <p>
                    Medi Remind allows you to track your medication history, providing you with valuable insights into your adherence and helping you have informed conversations with your healthcare provider. Track your medication history
                </p>
            </div>
            <div id="sub-nest-2-1" ref={subNest1Ref}></div>
        </div>
    );
}
  
export default SubMain2;