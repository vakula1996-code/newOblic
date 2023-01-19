import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";
import {CHECK_TOKEN, LOCAL_URLS, LOGIN} from "../utils/const";


export const login = async (login, password) => {
    const {data} = await $host.post(LOCAL_URLS + LOGIN, {login, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const data = await $authHost.options(LOCAL_URLS + CHECK_TOKEN)
    return data

}