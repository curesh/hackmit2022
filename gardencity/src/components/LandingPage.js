import React from 'react';
import landingPageDisplay from '../assets/landingPageDisplay.svg';
function LandingPage(){
    return(
        <div className='landing-page-body'>
        <p style={{fontFamily:'Manrope',fontWeight:'bold',fontSize:'50px'}}>GardenCity</p>
        <p>Volunteer to plan in a community garden or list your garden space!</p>
        {/* <a href='http://localhost:3000/map'>Click here to go to the map</a>
        <a href='http://localhost:3000/sidebarTemp'>Click here to go to the temporary sidebar</a> */}

        <img src={landingPageDisplay} alt='two flowers-a green one and a pink one'/>
        </div>
    )
}

export default LandingPage;