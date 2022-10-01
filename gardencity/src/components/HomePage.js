import React, { useEffect } from "react";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import Airtable from 'airtable';
import CustomMarker from "./CustomMarker";

const containerStyle = {
  width: '100vw',
  height: '100vh'
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
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={9}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
          {siteRecords.map(getMarkers)}
        </GoogleMap>
  ) : <></>
}

export default React.memo(HomePageScreen)