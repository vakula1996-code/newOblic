import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";
import {
    DOCUMENT_HISTORY,
    EXECUTION_ORDER,
    ORDER_NOT_EXECUTION,
    ORDER_NOT_REGISTER,
    REGISTER_ORDER,
    TECHNIQUE_HISTORY
} from "../utils/const";



export const orderNotRegister = async (document,id) =>{
    // if (localStorage.getItem('token')) {
    const {data} = await $authHost.post(ORDER_NOT_REGISTER(id),document)
    return data
    // }
}
export const orderNotExecution = async (document,id) =>{
    // if (localStorage.getItem('token')) {
    const {data} = await $authHost.post(ORDER_NOT_EXECUTION(id),document)
    return data
    // }
}

export const registerOrder = async (document) =>{
    // if (localStorage.getItem('token')) {
    const {data} = await $authHost.post(REGISTER_ORDER,document)
    return data
    // }
}

export const executionOrder = async (document)=>{
    // if (localStorage.getItem('token')) {
    const {data} = await $authHost.post(EXECUTION_ORDER,document)
    return data
    // }
}

export const documentHisory = async (id, idTechnique,idCategory) => {
    // if (localStorage.getItem('token')) {
    const {data} = await $authHost.post(DOCUMENT_HISTORY(id), {detailedTechniqueId:idTechnique,categoryId:idCategory})
    return data
    // }
}