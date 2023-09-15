import React, { useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Toasts.css";

import MonthlyBudget from "./Components/Pages/MonthlyBudget.jsx";
import NotificationsAboutDataValidation from "./Components/Notifications/NotificationsAboutDataValidation.jsx";

import loadAllData from "./Controllers/LoadAllDataController.js";

export default function App() {
    useEffect(() => {
        loadAllData();
    }, []);

    return <div className='app-container'>
        <NotificationsAboutDataValidation/>
        <MonthlyBudget/>
    </div>;
}