import React, {useEffect} from 'react';
import { Marker } from '@react-google-maps/api';
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyDSeRR2snjxxaHWQUd8S3NAb-mz_02jads"); // Turn into env var at some point

const CustomMarker = (props) => {
    const {id, address} = props;
    const [coords, setCoords] = React.useState({});
    const onMarkerClick = (evt) => {
        console.log(id);
    };

    useEffect(() => {
        var c;
        Geocode.fromAddress(address).then(
            (response) => {
              c = response.results[0].geometry.location;
              console.log(c);
              setCoords(c);

            },
            (error) => {
              console.error(error);
            }
        );
    }, [address, id]);

    return (
        <Marker
            onClick={onMarkerClick}
            position={coords}
            {...props}
        />
    );
};

export default CustomMarker;