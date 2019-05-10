//import './stylesheets/style.scss';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './style/myStyle.css';
import React, { Component } from 'react';
import { render } from 'react-dom';
import App from './Component/App.jsx';
//import { BrowserRouter } from 'react-router-dom';
//import 'bootstrap/dist/js/bootstrap.js'
import "./Index.css";
//import 'semantic-ui/dist/semantic.min.css';

function renderApp() {
    render (
            <App /> ,


            document.getElementById("root")
        );
   
}
renderApp();

