import React, { createContext, useState, useContext } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notif, setNotif] = useState({ open: false, message: "", severity: "info" });

    const showNotification = (message, severity = "info") => {
        setNotif({ open: true, message, severity });
    };

    const closeNotification = () => {
        setNotif(prev => ({ ...prev, open: false }));
    };

    return (
        <NotificationContext.Provider value={{ notif, showNotification, closeNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => useContext(NotificationContext);
