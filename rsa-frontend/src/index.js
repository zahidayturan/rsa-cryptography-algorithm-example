import React from 'react';
import {createRoot} from 'react-dom/client';
import './routes/css/index.css';
import App from './App';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <App />
        <ToastContainer position="top-right" autoClose={3000} />
    </React.StrictMode>
);

