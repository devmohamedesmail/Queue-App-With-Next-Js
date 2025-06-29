'use client'
import axios from 'axios';
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { api } from '../config/api';


// Define the type for a place (adjust as needed)
type Place = any; // Replace 'any' with your actual Place type if available

interface PlaceContextType {
  places: Place[];
  fetchplaces: () => void;
}

const PlaceContext = createContext<PlaceContextType>({
  places: [],
  fetchplaces: () => {},
});

interface PlaceProviderProps {
  children: ReactNode;
}

const PlaceProvider = ({ children }: PlaceProviderProps) => {
  const [places, setPlaces] = useState<Place[]>([]);

  const fetchplaces = async () => {
    try {
      const response = await axios.get(`${api.baseUrl}api/v1/places`);
      setPlaces(response.data.data || []);
    } catch (err) {
      console.log('Error fetch places', err);
      setPlaces([]); // fallback to empty array on error
    }
  };

  useEffect(() => {
    fetchplaces();
  }, []);

  return (
    <PlaceContext.Provider value={{ places, fetchplaces }}>
      {children}
    </PlaceContext.Provider>
  );
};

export { PlaceProvider, PlaceContext };