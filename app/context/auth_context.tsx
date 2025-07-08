'use client'
import React, { createContext, useState, useEffect, Dispatch, SetStateAction, ReactNode } from 'react';
import axios from 'axios';
import { api } from '../config/api';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Router } from 'next/router';




// Define the shape of your context
interface AuthContextType {
    auth: any;
    setAuth: Dispatch<SetStateAction<any>>;
    login: (email: string, password: string) => Promise<any>;
    register: (name: string, email: string, password: string) => Promise<any>;
    logout: () => Promise<any>;
}
// Create InfoContext using the Context API
const AuthContext = createContext<AuthContextType>({
    auth: null,
    setAuth: () => {},
    login: async () => ({ success: false }),
    register: async () => ({ success: false }),
    logout: async () => ({ success: false }),
});


const AuthProvider = ({ children }:any) => {
    const [auth, setAuth] = useState<any>(null);
    const { t } = useTranslation();


    // Load auth from storage on app start
    useEffect(() => {
        const loadUser = async () => {
            try {
                const userData = localStorage.getItem('user');
                if (userData) {
                    setAuth(JSON.parse(userData));
                }
            } catch (err) {
                console.error('Failed to load user from storage', err);
            }
        };
        loadUser();
    }, []);



    // 🔐 Login function
    const login = async (email: string, password: string) => {
        try {
            
            const res = await axios.post(`${api.baseUrl}api/v1/auth/login`, {
                email,
                password,
            });

            const user = res.data;
            setAuth(user);
            localStorage.setItem('user', JSON.stringify(user));
            return { success: true, status: res.status , user: user };
        } catch (error: any) {
            
            return { success: false, error: error.response?.data?.message || 'Login failed' };
        }
    };

    // 🧾 Register function
    const register = async (name: string, email: string, password: string) => {
        console.log('Registering user:', { name, email, password });
        try {
            const res = await axios.post(`${api.baseUrl}api/v1/auth/register`, {
                name,
                email,
                password,
            });

            const user = res.data;
            setAuth(user);
            localStorage.setItem('user', JSON.stringify(user));
            return { success: true, status: res.status , user: user };
        } catch (error: any) {
            console.log('Register error:', error.response?.data || error.message);
            return { success: false, error: error.response?.data?.message || 'Registration failed' };
        }
    };

    // 🚪 Logout function
    const logout = async () => {
        try {
            setAuth(null);
            localStorage.removeItem('user');
            toast.success(t('common.logout-success') || 'Logout successful');
            
            return { success: true };
        } catch (error: any) {
            console.error('Logout error:', error.message);
            return { success: false, error: 'Logout failed' };
        }
    };


    return (
        <AuthContext.Provider value={{ auth, setAuth, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };