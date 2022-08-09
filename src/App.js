import React, {useState} from "react";
import {BrowserRouter} from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import AppRouter from "./router/AppRouter";
import MenuAppBar from "./components/NavBar/HeaderNavBar";
import './App.css'


function App() {

    const [visibleNavbar, setVisibleNavbar] = useState(true)
    const rootClasses = ['container__navbar']
    if (visibleNavbar === true) {
        rootClasses.push('container__navbar_hide');
    }

    return (
        <BrowserRouter>
            <div className='main'>
                <MenuAppBar visibleNavbar={visibleNavbar} setVisibleNavbar={setVisibleNavbar}/>
                <div className='container'>
                    <div className={rootClasses.join(' ')}><NavBar visible={visibleNavbar}/></div>
                    <div className='container__appRouter'><AppRouter/></div>
                </div>

            </div>
        </BrowserRouter>
    );
}


export default App;