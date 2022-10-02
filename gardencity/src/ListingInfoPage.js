import React, { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';
import GridOnIcon from '@mui/icons-material/GridOn';
import GrassOutlinedIcon from '@mui/icons-material/GrassOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import './ListingInfoPage.css';

function ListingInfoPage(){
    const Airtable = require('airtable');
    const [listingRecord, setListingRecord] = useState(null);
    const {listingID} = useParams();

    const airtableConfig = {
    apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
    baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
    };
    const base = new Airtable({ apiKey: airtableConfig.apiKey }).base(airtableConfig.baseKey);

    function getListing(){
        base('Sites').find(listingID, (err, record)=>{
            if(err){
                console.error(err);
            }
            setListingRecord(record);
        })
    }

    useEffect(getListing, []);

    return(
        <div>
        {listingRecord!== null && listingRecord !== undefined ? (
            <div style={{margin:'2em 0 0 3em'}}>
                <div style={{display:'flex', flexDirection:'row'}}>
                    <div style={{display:'flex', flexDirection:'column'}}>
                        <p className='site-title'>{listingRecord.fields['Site Name']}</p>
                        <p className='site-location'>{listingRecord.fields['Location']}</p>
                        <p className='site-subtitle'>{new Date(listingRecord.fields['Start Date']).toDateString()} - {new Date(listingRecord.fields['End Date']).toDateString()}</p>
                    </div>
                    <div style={{margin:'1.25em 0 0 6em'}}>
                        <p className='site-subtitle'>by {listingRecord.fields['Lister Name']}</p>
                    </div>
                    <div style={{margin:'3em 0 0 15em'}}>
                        <div style={{background:'#2a7628', padding:'0.5em 2em', borderRadius:'10px'}}><button style={{background:'none', border:'none'}}><span style={{fontFamily:'Rubik', color:'white', fontSize:'15px'}}>Request a plot</span></button></div>
                        <p style={{textAlign:'end', color:'#967b37', fontFamily:'Rubik', fontStyle:'italic'}}>{listingRecord.fields['Num Plots']} plots available</p>
                    </div>
                </div>
                <div style={{display:'flex', flexDirection:'row'}}>
                    <div><img src={listingRecord.fields['Images'][0].url} alt='listing Image' /></div>
                    <div style={{display:'flex', flexDirection:'column',margin:'0 3em 0 2em', flex:'0 1 45%'}}>
                        <div style={{backgroundColor:'#f8f8f8', borderRadius:'15px', padding:'0.5em 2em', marginBottom:'2em'}}>
                            <p style={{fontFamily:'Manrope', fontWeight:'bold', fontSize:'19px'}}>Description</p>
                            <p style={{fontFamily:'Rubik', fontWeight:'normal', fontSize:'15px', marginBottom:'3em'}}>{listingRecord.fields['Description']}</p>
                        </div>
                        <div style={{backgroundColor:'#f8f8f8',borderRadius:'15px', padding:'0.5em 2em'}}>
                            <h2>{listingRecord.fields['Lister BG']}</h2>
                        </div>
                    </div>
                    <div style={{display:'flex', flexDirection:'column', margin:'0'}}>
                        <div style={{backgroundColor:'#f8f8f8', borderRadius:'15px',padding:'0.5em 0 0 1em'}}>
                            <p style={{fontFamily:'Manrope', fontWeight:'bold', fontSize:'20px'}}>Details</p>
                            <div style={{display:'flex', flexDirection:'column',rowGap:'8px' }}>
                                <div style={{display:'flex', flexDirection:'row'}}>
                                    <LightModeOutlinedIcon sx={{color: '#2A7628', paddingRight: 1}}/>
                                    <p style={{margin:'3px', fontSize:'14px'}}>{listingRecord.fields['Lighting']}</p>
                                </div>
                                <div style={{display:'flex', flexDirection:'row'}}>
                                    <PeopleAltOutlinedIcon sx={{color: '#2A7628', paddingRight: 1}}/>
                                    <p style={{marginTop:'3px',fontSize:'14px', marginRight: '1em'}}>Volunteer Capacity: {listingRecord.fields['Volunteer Capacity']} per plot</p>
                                </div>
                                <div style={{display:'flex', flexDirection:'row'}}>
                                    <GrassOutlinedIcon sx={{color: '#2A7628', paddingRight: 1}}/>
                                    <p style={{marginTop:'3px',fontSize:'14px', margin: '0 1em 0 0'}}>{listingRecord.fields['Plant Type'].join(', ')} allowed</p>
                                </div>
                                <div style={{display:'flex', flexDirection:'row'}}>
                                    <ConstructionOutlinedIcon sx={{color: '#2A7628', paddingRight: 1}}/>
                                    <p style={{margin:'3px',fontSize:'14px', lineHeight:'3px'}}>Supplies included: {listingRecord.fields['Available Supplies'].map((element)=><p>{element}</p>)}</p>
                                </div>
                                <div style={{display:'flex', flexDirection:'row'}}>
                                    <GridOnIcon sx={{color: '#2A7628', paddingRight:0.25}}/>
                                    <p style={{margin:'9px',fontSize:'14px', lineHeight:'3px'}}>{listingRecord.fields['Plot Size']} plots</p>
                                </div>
                                <div style={{display:'flex', flexDirection:'row', margin:'13px 0 2em 0'}}>
                                    <LockOutlinedIcon sx={{color: '#2A7628', paddingRight: 0.25}}/>
                                    <p style={{margin:'10px',fontSize:'14px', lineHeight:'3px'}}>{listingRecord.fields['Safety']}</p>
                                </div>
                            </div>
                           
                        </div>
                        <div>
                            <p>Availability</p>
                            <h3>{listingRecord.fields['Start Date']} - {listingRecord.fields['End Date']}</h3> on {listingRecord.fields['Availability'].map((element)=><h4>{element}</h4>)}
                        </div>
                    </div>
                </div>               
            </div>
        )
        : 
        <div>Loading</div>}
    </div>
    )
}

export default ListingInfoPage;