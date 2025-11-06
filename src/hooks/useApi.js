import { useCallback } from 'react';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://trabajo-integrador-veterinaria-bf31.vercel.app';

export const useApi = () => {
    const get = useCallback(async (endpoint) => {
        try {
            const response = await axios.get(`${BASE_URL}${endpoint}`);
            return response.data;
        } catch (error) {
            console.error('Error GET:', error);
            return null;
        }
    }, []);

    const post = useCallback(async (endpoint, data) => {
        try {
            const response = await axios.post(`${BASE_URL}${endpoint}`, data);
            return response.data;
        } catch (error) {
            console.error('Error POST:', error);
            return null;
        }
    }, []);

    const put = useCallback(async (endpoint, data) => {
        try {
            const response = await axios.put(`${BASE_URL}${endpoint}`, data);
            return response.data;
        } catch (error) {
            console.error('Error PUT:', error);
            return null;
        }
    }, []);

    const del = useCallback(async (endpoint) => {
        try {
            await axios.delete(`${BASE_URL}${endpoint}`);
            return true;
        } catch (error) {
            console.error('Error DELETE:', error);
            return false;
        }
    }, []);

    return { get, post, put, del };
};