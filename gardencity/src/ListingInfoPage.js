import React, { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';

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
            <div>
                <image src={listingRecord.fields['Images'][0].url} alt='listing Image' />
                <h1>{listingRecord.fields['Site Name']}</h1>
                <h2>{listingRecord.fields['Lister Name']}</h2>
                <h2>{listingRecord.fields['Lister BG']}</h2>
                <h2>{listingRecord.fields['Location']}</h2>
                <h3>{listingRecord.fields['Start Date']} - {listingRecord.fields['End Date']}</h3>
                <h3>Available:</h3>
                {listingRecord.fields['Availability'].map((element)=><h4>{element}</h4>)}
                <h5>{listingRecord.fields['Plot Size']}</h5>
                <h5>Number of Plots Available:{listingRecord.fields['Num Plots']}</h5>
                <h5>Volunteer Capacity: {listingRecord.fields['Volunteer Capacity']}</h5>
                <h6>{listingRecord.fields['Lighting']}</h6>
                <h6>Available Supplies: {listingRecord.fields['Available Supplies'].map((element)=><p>{element}</p>)}</h6>
                <h6>{listingRecord.fields['Safety']}</h6>
                <p>{listingRecord.fields['Description']}</p>
            </div>
        )
        : 
        <div>Loading</div>}
    </div>
    )
}

export default ListingInfoPage;