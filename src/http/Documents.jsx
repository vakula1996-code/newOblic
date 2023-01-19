import {$authHost} from "./index";
import {
    DOCUMENT_ALL,
    DOCUMENT_CANCEL_ORDER,
    DOCUMENT_DOWNLOAD_DOC,
    DOCUMENT_DOWNLOAD_SCAN,
    DOCUMENT_HISTORY,
    DOCUMENT_NOT_EXECUTION_OR_NOT_REGISTER,
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

export const executionOrder = async (document, file, documents) => {
    // if (localStorage.getItem('token')) {
    // console.log(Object.keys(files[0]))
    const formData = new FormData()
    if (file !== null && documents !== null) {
        formData.append('file', file)
        formData.append('data', JSON.stringify(document))
        documents.map(({file, documentScanName}) => {
            console.log(documentScanName, file)
            formData.append(documentScanName, file)
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

export const documentAll = async (id) => {
    // if (localStorage.getItem('token')) {
    const {data} = await $authHost.get(DOCUMENT_ALL(id))
    return data

    // }
}


export const downloadDOC = async (idSubdivision, idDocument) => {
    // if (localStorage.getItem('token')){
    try {
        const response = await $authHost.get(DOCUMENT_DOWNLOAD_DOC(idSubdivision, idDocument), {responseType: 'blob'})
        const objectURL = URL.createObjectURL(response.data)
        const a = document.createElement('a')
        a.setAttribute('href', objectURL)
        a.setAttribute('download', 'file.docx')
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(objectURL)
    } catch (error) {
        return error
    }


    // }
}
export const downloadPDF = async (idSubdivision, idDocument) => {
    // if (localStorage.getItem('token')){
    try {
        const response = await $authHost.get(DOCUMENT_DOWNLOAD_SCAN(idSubdivision, idDocument), {responseType: 'blob'})
        const objectURL = URL.createObjectURL(response.data)
        const a = document.createElement('a')
        a.setAttribute('href', objectURL)
        a.setAttribute('download', 'file.pdf')
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(objectURL)
    } catch (error) {
        return error
    }
    // }
}


export const documentExecution = async (subdivisionId, toSubdivisionId) => {
    // if (localStorage.getItem('token')) {
    const {data} = await $authHost.get(DOCUMENT_NOT_EXECUTION_OR_NOT_REGISTER(subdivisionId), toSubdivisionId)
    return data
    // }
}

export const documentCancel = async ({orderId, date}) => {
    // if (localStorage.getItem('token')) {
    const {data} = await $authHost.post(DOCUMENT_CANCEL_ORDER, {orderId, date})
    return data
    // }
}


export const upload = async () => {
    const {data} = await $authHost.get(UPLOAD)
    return data
}