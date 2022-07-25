import {makeAutoObservable, toJS} from "mobx";

export default class TechniqueStore {
    constructor() {
        this._listTechnique = []

        this._typeTechnique = []
        this._measurements = []
        this._category = []
        this._nameTechnique = []
        makeAutoObservable(this)
    }
    setListTechnique(list){
        this._listTechnique = list
    }

    setTypeTechnique(type) {
        this._typeTechnique = type
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



    get listTechnique(){
        return toJS(this._listTechnique)
    }

    get typeTechnique() {
        return this._typeTechnique
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


}

