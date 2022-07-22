import axios from "axios";
import {LOCAL_URLS} from "../utils/const";


const $host = axios.create({
    baseURL: LOCAL_URLS
})

const $authHost = axios.create({
    baseURL: LOCAL_URLS
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}