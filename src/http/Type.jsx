import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";
import {
    TYPE_CATEGORY_NAME,
    TYPE_DOCUMENT_NAME, TYPE_MEASUREMENTS_NAME,
    TYPE_SUBDIVISION_NAME,
    TYPE_TECHNIQUE,
    TYPE_TECHNIQUE_NAME,
} from "../utils/const";
import {type} from "@testing-library/user-event/dist/type";

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