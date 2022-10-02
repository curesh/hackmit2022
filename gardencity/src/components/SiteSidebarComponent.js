import React, {useEffect} from 'react';
import {Card, Box, Typography, CardMedia, Button} from '@mui/material';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import GrassOutlinedIcon from '@mui/icons-material/GrassOutlined';
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';
import PropTypes from 'prop-types';

function SiteSidebarComponent({    
    siteName,
    location,
    startDate,
    endDate,
    lighting,
    supplies,
    capacity,
    numPlots,
    plantTypes,
    imageURL
}){
  return(
    <Card sx={{ display: 'flex', padding: 1, margin: 1}}>
      <CardMedia
        component="img"
        sx={{ width: 150, height: 'auto', borderRadius: 2}}
        image={ imageURL }
        alt={siteName + "image"}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', paddingLeft: 2, width:'100%'}}>
        <Typography sx={{weight: 600, fontSize: 20}}>
          {siteName}
        </Typography>
        <Typography>
          {location}
        </Typography>
        <Typography sx={{color: '#606060', marginBottom: '1em'}}>
          {new Date(startDate).toLocaleString("en-US", {month: "short", day:"numeric"})}
          {' - '}
          {new Date(endDate).toLocaleString("en-US", {month: "short", day:"numeric"})}
        </Typography>
        <Box sx={{  display: 'grid', gridTemplateColumns: 'auto auto', textAlign:'center'}}>
          <Box sx={{display: 'flex', flexDirection:'row', alignItems: 'center'}}>
            <LightModeOutlinedIcon sx={{color: '#2A7628', paddingRight: 1}}/>
            <Typography sx={{color: '#606060', display:'inline-block'}}>{lighting}</Typography>
          </Box>
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <PeopleAltOutlinedIcon sx={{color: '#2A7628', paddingRight: 1}}/>
            <Typography sx={{color: '#606060'}}>{capacity} volunteers</Typography>
          </Box>
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <GrassOutlinedIcon sx={{color: '#2A7628', paddingRight: 1}}/>
            <Typography sx={{color: '#606060'}}>{plantTypes.join(', ')}</Typography>
          </Box>
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <ConstructionOutlinedIcon sx={{color: '#2A7628', paddingRight: 1}}/>
            <Typography sx={{color: '#606060'}}>Supplies {supplies.length === 0 ? 'not included' : ' available'}</Typography>
          </Box>
        </Box>
        <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems: 'center', marginTop: '.5em', marginRight: '.25em'}}>
          <Typography sx={{color: '#967B37'}}>
            {numPlots} plots available
          </Typography>
          <Button sx={{backgroundColor: '#2A7628', color: 'white', textTransform: 'none'}}>
            Request
          </Button>
        </Box>
      </Box>
    </Card> 
  )
}

SiteSidebarComponent.propTypes = {
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
}

export default SiteSidebarComponent;