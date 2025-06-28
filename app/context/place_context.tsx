'use client'
import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';
import { api } from '../config/api';


const PlaceContext = createContext({
  places: null,
 
  fetchplaces: () => {},
 
});


const PlaceProvider = ({ children }:any) => {
    const [places,setPlaces] = useState(null);
   

    useEffect(() => {
        fetchplaces(); 
        
    }, []); 

    const fetchplaces = async () => {
        try {
            const response = await axios.get(`${api.baseUrl}api/v1/places`);
            setPlaces(response.data.data);
                 
        } catch (err) {
            console.log("Error fetch places",err); 
        }
    }

  

    return (
        <PlaceContext.Provider value={{ places  ,fetchplaces  }}>
            {children}
        </PlaceContext.Provider>
    );
};

export { PlaceProvider, PlaceContext };