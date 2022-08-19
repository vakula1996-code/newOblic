import React, {useState} from "react";
import {BrowserRouter} from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import AppRouter from "./router/AppRouter";
import MenuAppBar from "./components/NavBar/HeaderNavBar";
import './App.css'


function App() {

    const [visibleNavbar, setVisibleNavbar] = useState(true)
    const rootClasses = ['box sidebar']
    if (visibleNavbar === true) {
        rootClasses.push('sidebar_hide');
    }

    return (
        <BrowserRouter>
            <div className='main'>
                <div className='wrapper'>
                    <div className='box header'>
                        <MenuAppBar  visibleNavbar={visibleNavbar} setVisibleNavbar={setVisibleNavbar}/>
                    </div>
                    <div className={rootClasses.join(' ')}><NavBar visible={visibleNavbar}/></div>
                    <div className='box content'><AppRouter/></div>
                    <div className='box footer'>footer</div>
                </div>

            </div>
        </BrowserRouter>
    );
}


export default App;