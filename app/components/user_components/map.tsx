"use client";
import React, { useContext, useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { PlaceContext } from '@/app/context/place_context';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { MdClose } from "react-icons/md";
import { MdOutlinePlace } from "react-icons/md";
import { IoArrowForwardOutline } from "react-icons/io5";




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
    <div className='h-[400px] md:h-[900px]  mx-auto '>
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
                <MdClose size={24}  />

              </button>
              <div className="flex flex-col items-center mt-5 justify-center gap-3 mb-4">
                <MdOutlinePlace size={40} color="#862877" />
                <h3 className="text-lg text-gray-800 font-bold">{selectedPlace?.nameEn}</h3>
                <h3 className="text-lg text-gray-800">{selectedPlace?.nameAr}</h3>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                
                <button
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm transition"
                  onClick={() => (document.getElementById('my_modal_3') as HTMLDialogElement)?.close()}
                >
                  
                  {t('common.close')}
                  <MdClose size={20} />
                </button>


                <Link
                  href={`/user/services/${selectedPlace?._id || ''}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-main hover:bg-second text-white  transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  
                  {t('common.details')}
                  <IoArrowForwardOutline />
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
