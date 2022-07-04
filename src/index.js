import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createTheme, ThemeProvider} from "@mui/material";

const root = ReactDOM.createRoot(document.getElementById('root'));
const theme = createTheme({
    typography: {
        fontFamily: 'Poppins'
    },
    palette: {
        primary: {
            main: '#1a536b'
        },
        secondary: {
            main: '#f76653'
        },
        text: {
            primary: '#1a536b',
            secondary: '#b0b7c9',
            accent: '#f76653',
            title: '#384054'
        },
        background: {
            default: '#d9f0f5',
            paper: '#ffffff'
        },
        light: {
            secondary: 'rgba(247,102,83,0.3)'
        },
        mode: "light"
    },
    shape: {
        borderRadius: 0
    }
});
root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <App/>
        </ThemeProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
