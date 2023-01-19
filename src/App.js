import React, {useContext, useEffect, useState} from "react";
import {HashRouter} from "react-router-dom";
import './App.css'
import {Context} from "./index";
import MenuAppBar from "./components/NavBar/HeaderNavBar";
import NavBar from "./components/NavBar/NavBar";
import AppRouter from "./router/AppRouter";
import {check} from "./http/userAPI";
import jwt_decode from "jwt-decode";
import {observer} from "mobx-react-lite";
import LoaderBody from "./components/UI/loader/loaderBody";


const App = observer(() => {
    const {user} = useContext(Context)
    // const navigate = useNavigate()
    const [visibleNavbar, setVisibleNavbar] = useState(true)
    const rootClasses = ['box sidebar']
    if (visibleNavbar === true) {
        rootClasses.push('sidebar_hide');
    }

    const [loading, setLoading] = useState(true)
    useEffect(() => {
        check()
            .then(function (respons) {
                if (respons.status === 200) {
                    user.setStatus(true)
                    user.setIsAuth(true)
                    user.setRole(jwt_decode(localStorage.token).role)
                } else {
                    user.setStatus(false)
                    user.setIsAuth(false)
                }
            })
            .catch(function (error) {
                    user.setStatus(false)
                    user.setIsAuth(false)
                }
            ).finally(() => setLoading(false))
    }, [])


    if (loading) {
        return <div><LoaderBody/></div>
    }

    return (
        <HashRouter>
            <div className='main'>
                <div className='wrapper'>
                    <div className='box header'>
                        <MenuAppBar visibleNavbar={visibleNavbar} setVisibleNavbar={setVisibleNavbar}/>
                    </div>
                    <div className={rootClasses.join(' ')}><NavBar visible={visibleNavbar}/></div>
                    <div className={'box' && user.isAuth ? 'content' : 'contentAuth'}><AppRouter/></div>
                    <div className='box footer'></div>
                </div>
            </div>
        </HashRouter>
    );
})


export default App;