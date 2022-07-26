import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";
import {ADD_NEW_TECHNIQUE, ADD_NEW_TECHNIQUE_OUTFIT, SUBDIVISIONS_TECHNIQUES} from "../utils/const";


export const addNewTechniqueHttp = async (document,technique) => {
    // if (localStorage.getItem('token')) {
        const {data} = await $authHost.post(ADD_NEW_TECHNIQUE,({documents:document,techniques:technique}))
        // return data
    // }
}
export const addNewTechniqueOutfitHttp = async (document,technique) => {
    // if (localStorage.getItem('token')) {
        const {data} = await $authHost.post(ADD_NEW_TECHNIQUE_OUTFIT,({documents:document,techniques:technique}))
        // return data
    // }
}
export const subdivisionsTechniques = async (id) => {
        // if (localStorage.getItem('token')) {
        const {data} = await $authHost.get(SUBDIVISIONS_TECHNIQUES(id))
        return data
        // }
}


