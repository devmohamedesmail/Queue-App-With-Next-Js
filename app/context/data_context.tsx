'use client'
import axios from "axios";
import { api } from "../config/api";
import React, { createContext, useState, useEffect } from 'react';


const DataContext = createContext({
    pages: undefined,
    settings: null,
    fetch_pages_content: () => {},
     fetch_settings: () => {},
});

const DataProvider = ({ children }: any) => {
    const [pages, setPages] = useState();
    const [settings,setSettings] = useState(null);




    const fetch_pages_content = async () => {

        try {
            const res = await axios.get(`${api.baseUrl}api/v1/pages`)
            setPages(res.data.data)
            
        } catch (error) {
           
        }
    }

      const fetch_settings = async () => {
        try {
            const response = await axios.get(`${api.baseUrl}api/v1/settings`);
            setSettings(response.data.data); 
            
        } catch (err) { 
            
        }
    }


    useEffect(() => {
        fetch_pages_content()
        fetch_settings();
    }, [])


    return (
        <DataContext.Provider value={{ pages ,fetch_pages_content, settings ,fetch_settings }}>
            {children}
        </DataContext.Provider>
    )
}


export { DataContext, DataProvider };