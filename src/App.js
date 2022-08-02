import React from "react";
import {BrowserRouter} from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import AppRouter from "./router/AppRouter";
import MenuAppBar from "./components/NavBar/HeaderNavBar";
import './App.css'

export default App;

function App() {
    return (
        <BrowserRouter>
            <div className='main'>
                    <MenuAppBar/>
                <div className='container'>
                    <div className='container__item1'><NavBar/></div>
                    <div className='container__item2'><AppRouter/></div>
                </div>

            </div>
        </BrowserRouter>
    );
}
