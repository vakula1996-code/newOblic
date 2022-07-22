import React from "react";
import {BrowserRouter} from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import AppRouter from "./router/AppRouter";
import MenuAppBar from "./components/NavBar/HeaderNavBar";

export default App;

function App() {
    return (
        <BrowserRouter>
            <div>
                <MenuAppBar/>
                <div>
                    <NavBar/>
                    <AppRouter/>
                </div>
            </div>
        </BrowserRouter>
    );
}
