import {$authHost} from "./index";
import {
    DOCUMENT_HISTORY,
    EXECUTION_ORDER,
    ORDER_NOT_EXECUTION,
    ORDER_NOT_REGISTER,
    REGISTER_ORDER,
    UPLOAD
} from "../utils/const";


export const orderNotRegister = async (document, id) => {
    // if (localStorage.getItem('token')) {
    const {data} = await $authHost.post(ORDER_NOT_REGISTER(id), document)
    return data
    // }
}
export const orderNotExecution = async (document, id) => {
    // if (localStorage.getItem('token')) {
    const {data} = await $authHost.post(ORDER_NOT_EXECUTION(id), document)
    return data
    // }
}

export const registerOrder = async (document) => {
    // if (localStorage.getItem('token')) {
    const {data} = await $authHost.post(REGISTER_ORDER, document)
    return data
    // }
}

export const executionOrder = async (document, file, files) => {
    // if (localStorage.getItem('token')) {
    // console.log(Object.keys(files[0]))
    const formData = new FormData()
    if (file !== null && files !== null) {
        formData.append('file', file)
        formData.append('data', JSON.stringify(document))
        files.map((file, index) => {
            const key = Object.keys(file)
            const data = Object.values(file)
            formData.append(`${key[0]}`, data[0])
        })
    }
    const {data} = await $authHost.post(
        EXECUTION_ORDER,
        formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    return data
}


export const documentHisory = async (id, idTechnique, idCategory) => {
    // if (localStorage.getItem('token')) {
    const {data} = await $authHost.post(DOCUMENT_HISTORY(id), {
        detailedTechniqueId: idTechnique,
        categoryId: idCategory,
        orderScanName: "file"
    })
    return data
    // }
}

export const upload = async () => {
    const {data} = await $authHost.get(UPLOAD)
    return data
}