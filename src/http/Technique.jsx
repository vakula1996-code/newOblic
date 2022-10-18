import {$authHost} from "./index";
import {
    ADD_NEW_TECHNIQUE,
    ADD_NEW_TECHNIQUE_OUTFIT, DECOMMISSIONED, INVENTORY_FOR_SUBDIVISION,
    LOOK_TECHNIQUE,
    SUBDIVISIONS_TECHNIQUES,
    TECHNIQUE_ENSURING,
    TECHNIQUE_HISTORY,
    TECHNIQUE_INFORMATION
} from "../utils/const";


export const addNewTechniqueHttp = async (document, technique, type, files) => {
    // if (localStorage.getItem('token')) {
    const formData = new FormData()
    if (files !== null) {
        formData.append('data', JSON.stringify({documents: document, techniques: technique}))
        document.map(({file, documentScanName}) => {


            formData.append(documentScanName, file)
        })
        const {data} = await $authHost.post(ADD_NEW_TECHNIQUE(type), formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        return data
        // }
    }
}
export const addNewTechniqueOutfitHttp = async (document, technique) => {
    // if (localStorage.getItem('token')) {
    const {data} = await $authHost.post(ADD_NEW_TECHNIQUE_OUTFIT, ({documents: document, techniques: technique}))
    // return data
    // }
}
export const subdivisionsTechniques = async (id) => {
    // if (localStorage.getItem('token')) {
    const {data} = await $authHost.get(SUBDIVISIONS_TECHNIQUES(id))
    return data
    // }
}


export const lookTechnique = async (id) => {
    // if (localStorage.getItem('token')) {
    const {data} = await $authHost.get(LOOK_TECHNIQUE(id))
    return data
    // }
}

export const techniqueInformation = async (id, idTechnique, idCategory) => {
    // if (localStorage.getItem('token')) {
    const {data} = await $authHost.post(TECHNIQUE_INFORMATION(id), {
        detailedTechniqueId: idTechnique,
        categoryId: idCategory
    })
    return data
    // }
}
export const techniqueHistory = async (id, idTechnique, idCategory) => {
    // if (localStorage.getItem('token')) {
    const {data} = await $authHost.post(TECHNIQUE_HISTORY(id), {
        detailedTechniqueId: idTechnique,
        categoryId: idCategory
    })
    return data
    // }
}


export const techniqueEnsuring = async (id) => {
    // if (localStorage.getItem('token')) {
    const {data} = await $authHost.get(TECHNIQUE_ENSURING(id))
    return data
    // }
}

export const decommissionedTechnique = async(document,details,files)=>{
    // if (localStorage.getItem('token')) {
    const formData = new FormData()
    if (files !== null) {
        formData.append('data', JSON.stringify({document:document[0],details:details}))
        formData.append(document[0].documentScanName, document[0].file)
        const {data} = await $authHost.post(DECOMMISSIONED, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        return data
        // }
    }
}

export const inventory = async(id)=>{
    // if (localStorage.getItem('token')) {
    const {data} = await $authHost.get(INVENTORY_FOR_SUBDIVISION(id))
    return data
    // }
}

