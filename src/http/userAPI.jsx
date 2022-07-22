import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";
import {CHECK_TOKEN, LOCAL_URLS, LOGIN} from "../utils/const";

import {Context} from "../index";
import {useContext} from "react";


export const login = async (login, password) => {
    const {data} = await $host.post(LOCAL_URLS+LOGIN, {login, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {user} = useContext(Context)
    const data = await $authHost.options(LOCAL_URLS+CHECK_TOKEN)
        .then(function (respons) {
            if (respons.status === 200){
                user.setStatus(true)
                user.setIsAuth(true)
            }
        })
        .catch(function (error) {
                user.setStatus(false)
                user.setIsAuth(false)

            }
        )
}