import {makeAutoObservable, toJS} from "mobx";
import {techniqueHisory, techniqueInformation} from "../http/Technique";

export default class TechniqueStore {
    constructor() {
        this._listTechnique = []
        this._listTechniqueForTable = []
        this._typeTechnique = []
        this._typeEnsuring = []
        this._measurements = []
        this._category = []
        this._nameTechnique = []
        this._moveTechnique = []
        this._moveTechniqueId = []
        this._techniqueInformation = []
        this._techniqueHisory = []
        makeAutoObservable(this)
    }

    setListTechnique(list) {
        this._listTechnique = list
    }
    setListTechniqueForTable(list) {
        this._listTechniqueForTable = list
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



    get listTechnique() {
        return toJS(this._listTechnique)
    }
    get listTechniqueForTable() {
        return toJS(this._listTechniqueForTable)
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
        return this._nameTechnique
    }


    get moveTechnique() {
        return toJS(this._moveTechnique)
    }

    get moveTechniqueId() {
        return toJS(this._moveTechniqueId)
    }

}

