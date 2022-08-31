import {makeAutoObservable, toJS} from "mobx";

export default class TechniqueStore {
    constructor() {
        this._listTechnique = []
        this._listTechniqueForTable = []
        this._listTechniqueDeregistration = []
        this._listTechniqueForExcluded = []
        this._listTechniqueForExcludedId = []
        this._listTechniqueModernization = []
        this._listNewTechniqueFromModernization = []
        this._listNewTechniqueFromModernizationForTable = []
        this._typeTechnique = []
        this._typeEnsuring = []
        this._measurements = []
        this._category = []
        this._nameTechnique = []
        this._moveTechnique = []
        this._moveTechniqueId = []
        this._techniqueInformation = []
        this._techniqueHisory = []
        this._listDeregistrationTechnique = []
        this._listDeregistrationTechniqueId = []
        this._listModernizationTechnique = []
        this._listModernizationTechniqueId = []
        makeAutoObservable(this)
    }

    get listTechnique() {
        return toJS(this._listTechnique)
    }

    get listTechniqueForTable() {
        return toJS(this._listTechniqueForTable)
    }

    get listTechniqueDeregistration() {
        return toJS(this._listTechniqueDeregistration)
    }

    get listTechniqueModernization() {
        return toJS(this._listTechniqueModernization)
    }

    get listNewTechniqueFromModernization() {
        return toJS(this._listNewTechniqueFromModernization)
    }

    get listNewTechniqueFromModernizationForTable() {
        return toJS(this._listNewTechniqueFromModernizationForTable)
    }

    get typeTechnique() {
        return this._typeTechnique
    }

    get typeEnsuring() {
        return this._typeEnsuring
    }

    get measurements() {
        return this._measurements
    }

    get category() {
        return this._category
    }

    get nameTechnique() {
        return toJS(this._nameTechnique)
    }

    get moveTechnique() {
        return toJS(this._moveTechnique)
    }

    get moveTechniqueId() {
        return toJS(this._moveTechniqueId)
    }

    get listDeregistrationTechnique() {
        return toJS(this._listDeregistrationTechnique)
    }

    get listDeregistrationTechniqueId() {
        return toJS(this._listDeregistrationTechniqueId)
    }

    get listModernizationTechnique() {
        return toJS(this._listModernizationTechnique)
    }

    get listModernizationTechniqueId() {
        return toJS(this._listModernizationTechniqueId)
    }

    get listTechniqueForExcluded() {
        return toJS(this._listTechniqueForExcluded)
    }

    get listTechniqueForExcludedId() {
        return toJS(this._listTechniqueForExcludedId)
    }

    setListTechnique(list) {
        this._listTechnique = list
    }

    setListTechniqueForTable(list) {
        this._listTechniqueForTable = list
    }

    setListTechniqueDeregistration(list) {
        this._listTechniqueDeregistration = list
    }

    setListTechniqueModernization(list) {
        this._listTechniqueModernization = list
    }

    setListNewTechniqueFromModernization(list) {
        this._listNewTechniqueFromModernization = list
    }

    setListNewTechniqueFromModernizationForTable(list) {
        this._listNewTechniqueFromModernizationForTable = list
    }

    setTypeTechnique(type) {
        this._typeTechnique = type
    }

    setTypeEnsuring(type) {
        this._typeEnsuring = type
    }

    setMeasurements(name) {
        this._measurements = name
    }

    setCategory(name) {
        this._category = name
    }

    setNameTechnique(name) {
        this._nameTechnique = name
    }

    setMoveTechnique(technique) {
        this._moveTechnique = technique
    }

    setMoveTechniqueId(techniqueId) {
        this._moveTechniqueId = techniqueId
    }

    setTechniqueHistory(techniqueId) {
        this._moveTechniqueId = techniqueId
    }

    setListDeregistrationTechnique(technique) {
        this._listDeregistrationTechnique = technique
    }

    setListDeregistrationTechniqueId(techniqueId) {
        this._listDeregistrationTechniqueId = techniqueId
    }

    setListModernizationTechnique(technique) {
        this._listModernizationTechnique = technique
    }

    setListModernizationTechniqueId(techniqueId) {
        this._listModernizationTechniqueId = techniqueId
    }

    setListTechniqueForExcluded(technique) {
        this._listTechniqueForExcluded = technique
    }

    setListTechniqueForExcludeId(techniqueId) {
        this._listTechniqueForExcludedId = techniqueId
    }

}

