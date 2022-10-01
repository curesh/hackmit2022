import React from 'react';

function LandingPage(){
    return(
        <div style={{display:'flex', margin:'auto',placeItems:'center'}}>
            This is a Landing Page <br/>
            <a href='http://localhost:3000/map'>Click here to go to the map</a>
            <a href="http://localhost:3000/listingInfo/rec7r6kSsOMPlmktK"> Link to a listing</a>
        </div>
    )
}

export default LandingPage;