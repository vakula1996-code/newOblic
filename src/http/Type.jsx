import {$authHost} from "./index";
import {
    MODERNIZATION,
    TYPE_CATEGORY_NAME,
    TYPE_DOCUMENT_NAME,
    TYPE_ENSURING,
    TYPE_MEASUREMENTS_NAME,
    TYPE_SUBDIVISION_NAME,
    TYPE_TECHNIQUE,
    TYPE_TECHNIQUE_NAME,
} from "../utils/const";

export const nameSubdivisions = async () => {
    // if (localStorage.getItem('token')) {
    const {data} = await $authHost.get(TYPE_SUBDIVISION_NAME)
    return data
    // }
}
export const nameDocument = async (id) => {
    // if (localStorage.getItem('token')) {
    const {data} = await $authHost.get(TYPE_DOCUMENT_NAME(id))
    return data
    // }
}
export const nameTechniqueType = async () => {
    // if (localStorage.getItem('token')) {
    const {data} = await $authHost.get(TYPE_TECHNIQUE)
    return data
    // }
}

export const nameTechnique = async () => {
    // if (localStorage.getItem('token')) {
    const {data} = await $authHost.get(TYPE_TECHNIQUE_NAME)
    return data
    // }
}
export const nameMeasurements = async () => {
    // if (localStorage.getItem('token')) {
    const {data} = await $authHost.get(TYPE_MEASUREMENTS_NAME)
    return data
    // }
}
export const nameCategory = async (id) => {
    // if (localStorage.getItem('token')) {
    const {data} = await $authHost.get(TYPE_CATEGORY_NAME(id))

    return data

    // }
}
export const nameEnsuring = async () => {
    // if (localStorage.getItem('token')) {
    const {data} = await $authHost.get(TYPE_ENSURING)
    return data
    // }
}

export const modernization = async (technique) => {
    // if (localStorage.getItem('token')) {
    const {data} = await $authHost.post(MODERNIZATION, technique)
    return data
    // }
}