import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';




const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
};


const Map = () => {

    const [center, setCenter] = useState({
        lat: 59.95,
        lng: 30.33
    });
    const zoom = 11;



    function success(pos) {
        const crd = pos.coords;
        setCenter({
            lat: crd.latitude,
            lng: crd.longitude
        })

        // console.log("Your current position is:");
        // console.log(`Latitude : ${crd.latitude}`);
        // console.log(`Longitude: ${crd.longitude}`);
        // console.log(`More or less ${crd.accuracy} meters.`);
    };

    function errors(err) {
        alert(`ERROR(${err.code}): ${err.message}`);
        console.warn(`ERROR(${err.code}): ${err.message}`);
    };



    useEffect(() => {
        if (navigator.geolocation) {
            navigator.permissions
                .query({ name: "geolocation" })
                .then(function (result) {
                    if (result.state === "granted") {
                        navigator.geolocation.getCurrentPosition(success);
                    } else if (result.state === "prompt") {
                        navigator.geolocation.getCurrentPosition(success, errors, options);
                    } else if (result.state === "denied") {
                        //If denied then you have to show instructions to enable location
                    }
                    result.onchange = function () {
                        console.log(result.state);
                    };
                });
        } else {
            alert("Sorry Not available!");
        }

    }, [])


    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '50vh', width: '60%', margin: '0 auto' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyDCZ-HHhKHwJQqngMu9ax7KAR7_JGpVL90" }}
                center={center}
                defaultZoom={zoom}
            >
            </GoogleMapReact>
        </div>
    );
};

export default Map;