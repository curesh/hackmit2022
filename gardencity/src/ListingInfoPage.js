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
        <>
        {listingRecord!== null && listingRecord !== undefined ? (
            <div style={{margin: '3em 2em'}}>
                <div style={{display:'flex', flexDirection:'row', overflow: 'true'}}>
                    <div style={{display:'flex', flexDirection:'column', overflow: 'false'}}>
                        <p className='site-title'>{listingRecord.fields['Site Name']}</p>
                        <p className='site-location'>{listingRecord.fields['Location']}</p>
                        <p className='site-subtitle'>
                            {new Date(listingRecord.fields['Start Date']).toLocaleString("en-US", {month: "short", day:"numeric"})}
                            {' - '}
                            {new Date(listingRecord.fields['End Date']).toLocaleString("en-US", {month: "short", day:"numeric"})}
                        </p>
                    </div>
                    <div style={{margin:'.4em 0 0 3em'}}>
                        <p className='site-subtitle'>by {listingRecord.fields['Lister Name']}</p>
                    </div>
                    <div style={{margin:'0 0 0 auto', overflow: 'false'}}>
                        <div style={{background:'#2a7628', padding:'0.5em 2em', borderRadius:'10px'}}><button style={{background:'none', border:'none'}}><span style={{fontFamily:'Rubik', color:'white', fontSize:'15px'}}>Request a plot</span></button></div>
                        <p style={{textAlign:'end', color:'#967b37', fontFamily:'Rubik', fontStyle:'italic'}}>{listingRecord.fields['Num Plots']} plots available</p>
                    </div>
                </div>
                <div style={{display:'flex', flexDirection:'row', marginTop: '2em'}}>
                    <div><img style={{width: '35vw'}} src={listingRecord.fields['Images'][0].url} alt='listing Image' /></div>
                    <div style={{display:'flex', flexDirection:'column',margin:'0 1.5em 0 1.5em', flex:'0 1 45%'}}>
                        <div style={{backgroundColor:'#f8f8f8', borderRadius:'12px', padding:'.5em 2em', marginBottom:'2em'}}>
                            <p style={{fontFamily:'Manrope', fontWeight: 800, fontSize:'20px'}}>Description</p>
                            <p style={{fontFamily:'Rubik', fontWeight: 100, fontSize:'14px', marginBottom:'1.5em'}}>{listingRecord.fields['Description']}</p>
                        </div>
                        <div style={{backgroundColor:'#f8f8f8',borderRadius:'15px', padding:'0.5em 2em'}}>
                            <p style={{fontFamily:'Manrope', fontWeight: 800, fontSize:'20px'}}>Lister Biography</p>
                            <p style={{fontFamily:'Rubik', fontWeight: 100, fontSize:'14px', marginBottom:'1.5em'}}>{listingRecord.fields['Lister BG']}</p>
                        </div>
                    </div>
                    <div style={{display:'flex', flexDirection:'column', margin:'0'}}>
                        <div style={{backgroundColor:'#f8f8f8', borderRadius:'15px',padding:'0.5em 0 0 1em', marginBottom:'2em'}}>
                            <p style={{fontFamily:'Manrope', fontWeight:'bold', fontSize:'20px'}}>Details</p>
                            <div style={{display:'flex', flexDirection:'column',rowGap:'8px' }}>
                                <div style={{display:'flex', flexDirection:'row'}}>
                                    <LightModeOutlinedIcon sx={{color: '#2A7628', paddingRight: 1}}/>
                                    <p style={{color: '#606060', margin:'3px', fontSize:'14px', fontFamily:'Rubik', fontWeight: 100,}}>{listingRecord.fields['Lighting']} sunlight</p>
                                </div>
                                <div style={{display:'flex', flexDirection:'row'}}>
                                    <PeopleAltOutlinedIcon sx={{color: '#2A7628', paddingRight: 1}}/>
                                    <p style={{color: '#606060', marginTop:'3px',fontSize:'14px', fontFamily:'Rubik', fontWeight: 100, marginRight: '1em'}}> {listingRecord.fields['Volunteer Capacity']} volunteers per plot</p>
                                </div>
                                <div style={{display:'flex', flexDirection:'row'}}>
                                    <GrassOutlinedIcon sx={{color: '#2A7628', paddingRight: 1}}/>
                                    <p style={{color: '#606060', marginTop:'3px',fontSize:'14px', fontFamily:'Rubik', fontWeight: 100, margin: '0 1em 0 0'}}>{listingRecord.fields['Plant Type'].join(', ')} allowed</p>
                                </div>
                                <div style={{display:'flex', flexDirection:'row'}}>
                                    <ConstructionOutlinedIcon sx={{color: '#2A7628', paddingRight: 1}}/>
                                    <p style={{color: '#606060', margin:'3px',fontSize:'14px', fontFamily:'Rubik', fontWeight: 100, lineHeight:'3px'}}>Supplies included: {listingRecord.fields['Available Supplies'].map((element)=><p>{element}</p>)}</p>
                                </div>
                                <div style={{display:'flex', flexDirection:'row'}}>
                                    <GridOnIcon sx={{color: '#2A7628', paddingRight:0.25}}/>
                                    <p style={{color: '#606060', margin:'9px',fontSize:'14px', fontFamily:'Rubik', fontWeight: 100, lineHeight:'3px'}}>{listingRecord.fields['Plot Size']} plots</p>
                                </div>
                                <div style={{display:'flex', flexDirection:'row', margin:'13px 0 2em 0'}}>
                                    <LockOutlinedIcon sx={{color: '#2A7628', paddingRight: 0.25}}/>
                                    <p style={{color: '#606060', margin:'10px',fontSize:'14px', fontFamily:'Rubik', fontWeight: 100, lineHeight:'3px'}}>{listingRecord.fields['Safety']}</p>
                                </div>
                            </div>
                        </div>
                        <div style={{backgroundColor:'#f8f8f8', borderRadius:'15px',padding:'0.5em 0 0 1em'}}>
                            <p style={{fontFamily:'Manrope', fontWeight:'bold', fontSize:'20px'}}>Availability</p>
                            <p style={{fontSize:'14px', fontFamily:'Rubik', fontWeight: 100, display:'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center'}}>
                                {new Date(listingRecord.fields['Start Date']).toLocaleString("en-US", {month: "short", day:"numeric"})}
                                {' - '}
                                {new Date(listingRecord.fields['End Date']).toLocaleString("en-US", {month: "short", day:"numeric"})}
                                {' on'}
                                {listingRecord.fields['Availability'].map((element)=> (
                                    <p style={{backgroundColor:'#D5EDBC', color:'#2A7628', borderRadius:'15px', padding: '.25em .75em', margin: '.25em', width:'min-content'}}>{element[0]}</p>
                                ))}
                            </p>
                        </div>
                    </div>
                </div>               
            </div>
        )
        : 
        <div>Loading</div>}
    </>
    )
}

export default ListingInfoPage;