import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";
import {
        ADD_NEW_TECHNIQUE,
        ADD_NEW_TECHNIQUE_OUTFIT,
        CREATE_ORDER,
        LOOK_TECHNIQUE,
        SUBDIVISIONS_TECHNIQUES, TECHNIQUE_HISTORY, TECHNIQUE_INFORMATION
} from "../utils/const";


export const addNewTechniqueHttp = async (document,technique,type) => {
    // if (localStorage.getItem('token')) {
        const {data} = await $authHost.post(ADD_NEW_TECHNIQUE(type),({documents:document,techniques:technique}))
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

export const createOrder = async ({document, techniques})=>{
        // if (localStorage.getItem('token')) {
        const {data} = await $authHost.post(CREATE_ORDER,{document,techniques})
        // return data
        // }
}


export  const lookTechnique = async (id)=>{
        // if (localStorage.getItem('token')) {
        const {data} = await $authHost.get(LOOK_TECHNIQUE(id))
        return data
        // }
}

export const techniqueInformation = async (id,idTechnique)=>{
        // if (localStorage.getItem('token')) {
        const {data} = await $authHost.post(TECHNIQUE_INFORMATION(id),{detailedTechniqueId:idTechnique})
        return data
        // }
}
export const techniqueHistory = async (id, idTechnique) => {
        // if (localStorage.getItem('token')) {
        const {data} = await $authHost.post(TECHNIQUE_HISTORY(id), {detailedTechniqueId:idTechnique})
        return data
        // }
}



