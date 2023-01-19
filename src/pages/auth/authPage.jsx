import React, {useContext, useState} from 'react';
import './auth.css'
import {login} from "../../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {useNavigate} from "react-router-dom";

const AuthPage = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const [data, setData] = useState({login: '', password: ''})
    const [error, setError] = useState(false)
    const [loginInput, setLoginInput] = useState(false)
    const [passwordInput, setPasswordInput] = useState(false)
    const onAuth = (e) => {
        if (data.login === '') {
            setLoginInput(true)
            setError(false)
        }
        if (data.password === '') {
            setPasswordInput(true)
            setError(false)
        } else {
            login(data.login, data.password).then(
                data => {
                    user.setRole(data.role)
                    user.setIsAuth(true)
                    navigate('/', {replace: true})
                }
            ).catch(
                error => {
                    if (error.response.data.detail === "Недійсний пароль" || error.response.data.detail === "Недійсний логін") {
                        setError(true)
                        setLoginInput(false)
                        setPasswordInput(false)
                    }
                }
            )
        }
    }
    return (
        <div className='blockAuth'>
            <div className="mainAuth">
                <div className="signupAuth">
                    <label className='labelAuth' htmlFor="chk" aria-hidden="true">Авторизація</label>
                    <span className='errorInput'
                          style={error === false ? {visibility: "hidden"} : {visibility: 'visible'}}>Перевірте правильність логіну та паролю</span>
                    <input className='inputAuth' type="email" name="email" placeholder="Логін" required=""
                           onChange={(event) => setData({...data, login: event.target.value})}
                    />
                    <span className='spanInput'
                          style={loginInput === false ? {visibility: 'hidden'} : {visibility: 'visible'}}>Логін не може бути пустим</span>
                    <input className='inputAuth' type="password" name="pswd" placeholder="Пароль" required=""
                           onChange={(event) => setData({...data, password: event.target.value})}
                    />
                    <span className='spanInput'
                          style={passwordInput === false ? {visibility: 'hidden'} : {visibility: 'visible'}}>Пароль не може бути пустим</span>
                    <button className='buttonAuth' onClick={onAuth}>Вхід</button>
                </div>
            </div>
        </div>
    );
});

export default AuthPage;