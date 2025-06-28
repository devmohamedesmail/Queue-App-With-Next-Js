"use client";
import React, { useContext, useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { PlaceContext } from '@/app/context/place_context';



const containerStyle = {
  width: '100%',
  height: '100%',
};

// Fallback center location (Dubai)
const defaultCenter = {
  lat: 25.276987,
  lng: 55.296249,
};

// Define a type for a place
interface Place {
  lat: number | string;
  lng: number | string;
  location?: {
    lat: number | string;
    lng: number | string;
  };
}

const Map = () => {
  const { places }:any = useContext(PlaceContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Use the first valid place as center, or default
  const validPlaces = (places || []).filter(
    (p: Place) => !isNaN(Number(p.lat ?? p.location?.lat)) && !isNaN(Number(p.lng ?? p.location?.lng))
  );

  const center = validPlaces.length > 0
    ? {
        lat: Number(validPlaces[0].lat ?? validPlaces[0].location?.lat),
        lng: Number(validPlaces[0].lng ?? validPlaces[0].location?.lng),
      }
    : defaultCenter;


  return (
 <div className='h-[400px] md:h-[900px]'>
     <LoadScript googleMapsApiKey="AIzaSyA74gOioKDIY9AlPHe3eyu4yTSvyAN8RMM">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        {/* <Marker position={center} /> */}
        {(places || []).map((place: any, index: number) => (
          <Marker
            key={index}
            position={{
              lat: Number(place.lat ?? place.location?.lat),
              lng: Number(place.lng ?? place.location?.lng),
            }}
          />
        ))}
      </GoogleMap>
    </LoadScript>
 </div>
  );
};

export default Map;
