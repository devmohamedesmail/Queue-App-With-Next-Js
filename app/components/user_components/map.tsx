"use client";
import React, { useContext, useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { PlaceContext } from '@/app/context/place_context';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';




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
  nameEn?: string;
  nameAr?: string;
  descriptionEn?: string;
  _id?: string;
}

const Map = () => {
  const { places }: any = useContext(PlaceContext);
  const [mounted, setMounted] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const { t } = useTranslation();

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
            <React.Fragment key={index}>
              <Marker
                onClick={() => {
                  setSelectedPlace(place);
                  const modal = document.getElementById('my_modal_3') as HTMLDialogElement;
                  if (modal) modal.showModal();
                }}
                position={{
                  lat: Number(place.lat ?? place.location?.lat),
                  lng: Number(place.lng ?? place.location?.lng),
                }}
              />
             
            </React.Fragment>
          ))}
          {/* Modal outside the map loop for single instance */}
          <dialog id="my_modal_3" className="modal">
            <div className="modal-box relative bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200 p-8 max-w-md mx-auto">
              <button
                className="absolute right-4 top-4 text-gray-500 hover:text-red-500 transition"
                aria-label="Close"
                onClick={() => (document.getElementById('my_modal_3') as HTMLDialogElement)?.close()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 12.414a4 4 0 10-1.414 1.414l4.243 4.243a1 1 0 001.414-1.414z" /></svg>
                </span>
                <h3 className="font-bold text-lg text-gray-800">{selectedPlace?.nameEn}</h3>
                
              </div>
              <div className="mb-6">
                <h3 className="font-bold text-lg text-gray-800">{selectedPlace?.nameAr}</h3>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold transition"
                  onClick={() => (document.getElementById('my_modal_3') as HTMLDialogElement)?.close()}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  {t('common.close')}
                </button>
                <Link
                  href={`/user/services/${selectedPlace?._id || ''}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-main hover:bg-second text-white font-semibold transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 3h7m0 0v7m0-7L10 14m-7 7h7a2 2 0 002-2v-7" /></svg>
                 {t('common.details')}
                </Link>
              </div>
            </div>
          </dialog>
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Map;
