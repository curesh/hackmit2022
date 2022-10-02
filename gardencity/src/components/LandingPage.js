import React from 'react';
import landingPageDisplay from '../Assets/Images/landingPageDisplay.svg';
function LandingPage(){
    return(
        <div className='landing-page-body'>
        <p style={{fontFamily:'Manrope',fontWeight:'bold',fontSize:'50px', margin:'60vh 0 3vh 0', display:'flex',justifyContent:'center'}}>GardenCity</p>
        <p style={{margin:'auto'}}>Volunteer to plan in a community garden or list your garden space!</p>
        <div style={{display:'flex', flexDirection:'row', margin:'3em auto 0 auto', columnGap:'2em'}}>
            <div className='landing-page-register-button'>Register</div>
            <a href='http://localhost:3000/map' className='landing-page-map-button' style={{}}><div>Browse Map</div></a>
        </div>
        {/* <a href='http://localhost:3000/map'>Click here to go to the map</a>
        <a href='http://localhost:3000/sidebarTemp'>Click here to go to the temporary sidebar</a> */}

        <img style={{marginTop:'-2em'}}src={landingPageDisplay} alt='two flowers-a green one and a pink one'/>

            {/* This is a Landing Page <br/>
            <a href='http://localhost:3000/map'>Click here to go to the map</a>
            <a href="http://localhost:3000/listingInfo/rec7r6kSsOMPlmktK"> Link to a listing</a>
            <a href='http://localhost:3000/sidebarTemp'>Click here to go to the temporary sidebar</a> */}
        </div>
    )
}

export default LandingPage;