import React, {useState, useEffect} from 'react';
import SiteSidebarComponent from './SiteSidebarComponent';
import { v4 } from "uuid";

// airtable configuration
const Airtable = require('airtable');

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

function MapSidebar(){
  const [sites, setSites] = useState([]);

  const getSites = () => {
    base('Sites').select({ view: 'Grid view' }).all()
      .then((records) => {
        setSites(records);
      });
  };

  useEffect(getSites, []);

    
  return(
      <div style={{display:'flex', flexDirection: 'column', width: '40vw', height: '100vh', fontSize:'2em'}}>
        Spaces
        <div style={{marginTop: '.5em', overflowY: 'auto'}}>
          {sites.map((site) => {
            return(
              <SiteSidebarComponent
                key={v4()}
                siteName={site.fields['Site Name']}
                location={site.fields['Location']}
                startDate={site.fields['Start Date']}
                endDate={site.fields['End Date']}
                lighting={site.fields['Lighting']}
                supplies={site.fields['Available Supplies']}
                numPlots={site.fields['Num Plots']}
                plantTypes={site.fields['Plant Type']}
                capacity={site.fields['Volunteer Capacity']}
                imageURL={site.fields.Images[0].url}
              />
            );})
          }
        </div>
      </div>
  )
}

export default MapSidebar;