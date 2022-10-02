import React, { useEffect } from "react";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import Airtable from 'airtable';
import SiteSidebarComponent from './SiteSidebarComponent';
import CustomMarker from "./CustomMarker";
import { v4 } from "uuid";


const containerStyle = {
  width: '65vw',
  height: '80vh',
};

const center = {
  lat: 34.0522,
  lng: -118.2437
};

Airtable.configure({
  apiKey: 'keyGYLBhqwHr7QccH',
});

const base = Airtable.base('appQJMizPte9hDL9a');
const GOOG_API = "AIzaSyBifI01enjQL5CJu8SvXKfZLqueUN2dWsY";

function HomePageScreen() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOG_API
  })

  const [map, setMap] = React.useState(null)
  const [siteRecords, setSiteRecords] = React.useState([])

  function getSites() {
    base('Sites').select({ view: 'Grid view' }).all()
      .then((siteRecords) => {
        setSiteRecords(siteRecords);
      });
  }

  const getMarkers = ((props, i)=> {
    const address = props.get('Location');
    return (
        <CustomMarker
          id={i}
          key={i}
          address={address}
        />
      )
  });


  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  useEffect(() => {
    getSites();
    console.log(siteRecords);
    }, [siteRecords]);

  return isLoaded ? (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <div style={{fontSize: '2em'}}>
        Find a Community Garden
      </div>
      <div style={{display: 'flex', flexDirection: 'row'}}>
          <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={9}
              onLoad={onLoad}
              onUnmount={onUnmount}
          >
            {siteRecords.map(getMarkers)}
          </GoogleMap>
          <div style={{display:'flex', flexDirection: 'column', width: '35vw', height: '100vh', fontSize:'2em'}}>
            Spaces
            <div style={{marginTop: '.5em', overflowY: 'auto'}}>
              {siteRecords.map((site) => (
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
              ))}
            </div>
          </div>
        </div>
      </div>
  ) : <></>
}

export default React.memo(HomePageScreen)