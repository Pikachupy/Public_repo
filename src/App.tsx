import React from 'react';
import {Routes, Route} from "react-router-dom";
import './App.css';
import {ContactPage} from "./contact";
import {routesPaths} from "./routes";
import {Navigation} from "./navigation";
import {FormPage} from "./form";
import {AboutPage} from "./about";
import {ErrorPage} from "./error";
import {HomePage} from "./home";

function App() {
    return (
        <div className="App">
            <Navigation/>
            <Routes>
                <Route path={`/${routesPaths.home}`} element={<HomePage/>}/>
                <Route path='*' element={<ErrorPage/>}/>
                <Route path={`/${routesPaths.about}`} element={<AboutPage/>}/>
                <Route path={`/${routesPaths.contact}`} element={<ContactPage/>}/>
                <Route path={`/${routesPaths.form}`} element={<FormPage/>}/>
            </Routes>
        </div>
    );
}

export default App;
