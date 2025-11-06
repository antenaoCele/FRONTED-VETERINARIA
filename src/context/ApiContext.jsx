import React, { createContext, useContext } from "react";
import api from "../services/api";

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
    const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

    return (
        <ApiContext.Provider value={{ api, baseURL }}>
            {children}
        </ApiContext.Provider>
    );
};

export const useApi = () => useContext(ApiContext);
