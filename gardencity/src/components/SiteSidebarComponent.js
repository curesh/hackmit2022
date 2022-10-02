import React from 'react';
import {Card, Box, Typography, CardMedia, ButtonBase} from '@mui/material';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import GrassOutlinedIcon from '@mui/icons-material/GrassOutlined';
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import Geocode from "react-geocode";
import './SiteSidebarComponent.css';

const styles = {
  cardAction: {
    display: 'block',
    textAlign: 'initial'
  }
}

function SiteSidebarComponent({    
    id,
    siteName,
    location,
    startDate,
    endDate,
    lighting,
    supplies,
    capacity,
    numPlots,
    plantTypes,
    imageURL,
    setCurrCoords,
    setCurrZoom
}){
  const onCardClick = () => {
    var c;
    Geocode.fromAddress(location).then(
        (response) => {
          c = response.results[0].geometry.location;
          console.log(c);
          setCurrCoords(c);
          setCurrZoom(9);
        },
        (error) => {
          console.error(error);
        }
    );
  }

  return(
    <ButtonBase
      className={styles.cardAction}
      onClick={() => {onCardClick()}}
    >
      <Card sx={{ display: 'flex', padding: 1, margin: 1}}>
        <CardMedia
          component="img"
          sx={{ width: 150, height: 'auto', borderRadius: 2}}
          image={ imageURL }
          alt={siteName + "image"}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', paddingLeft: 2, width:'100%', textAlign:'start'}}>
          <Typography sx={{weight: 600, fontSize: 20, fontFamily:'Rubik'}}>
            {siteName}
          </Typography>
          <Typography sx={{fontFamily:'Rubik'}}>
            {location}
          </Typography>
          <Typography sx={{color: '#606060', marginBottom: '1em', fontFamily:'Rubik'}}>
            {new Date(startDate).toLocaleString("en-US", {month: "short", day:"numeric"})}
            {' - '}
            {new Date(endDate).toLocaleString("en-US", {month: "short", day:"numeric"})}
          </Typography>
          <Box sx={{  display: 'grid', gridTemplateColumns: 'auto auto', textAlign:'start'}}>
            <Box sx={{display: 'flex', flexDirection:'row', alignItems: 'center'}}>
              <LightModeOutlinedIcon sx={{color: '#2A7628', paddingRight: 1}}/>
              <Typography sx={{color: '#606060', display:'inline-block', fontFamily:'Rubik', fontSize:'.9rem'}}>{lighting}</Typography>
            </Box>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
              <PeopleAltOutlinedIcon sx={{color: '#2A7628', paddingRight: 1}}/>
              <Typography sx={{color: '#606060', fontFamily:'Rubik', fontSize:'.9rem'}}>{capacity} volunteers</Typography>
            </Box>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
              <GrassOutlinedIcon sx={{color: '#2A7628', paddingRight: 1}}/>
              <Typography sx={{color: '#606060', fontFamily:'Rubik', fontSize:'.9rem'}}>{plantTypes.join(', ')}</Typography>
            </Box>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
              <ConstructionOutlinedIcon sx={{color: '#2A7628', paddingRight: 1}}/>
              <Typography sx={{color: '#606060', fontFamily:'Rubik', fontSize:'.9rem'}}>Supplies {supplies.length === 0 ? 'not included' : ' available'}</Typography>
            </Box>
          </Box>
          <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems: 'center', marginTop: '.75em', marginRight: '.25em'}}>
            <Typography sx={{color: '#967B37', fontFamily:'Rubik', fontSize:'.9rem', fontStyle: 'italic'}}>
              {numPlots} plots available
            </Typography>
            <NavLink to={'/listingInfo/' + id} className='request-button'>
              Request
            </NavLink>
          </Box>
        </Box>
      </Card> 
    </ButtonBase>
  )
}

SiteSidebarComponent.propTypes = {
  id: PropTypes.string.isRequired,
  siteName: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  lighting: PropTypes.string.isRequired,
  supplies: PropTypes.arrayOf(PropTypes.string).isRequired,
  numPlots: PropTypes.number.isRequired,
  capacity: PropTypes.number.isRequired,
  plantTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  imageURL: PropTypes.string.isRequired,
  setCurrCoords: PropTypes.func.isRequired,
}

export default SiteSidebarComponent;