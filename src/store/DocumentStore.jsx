import {makeAutoObservable} from "mobx";

export default class DocumentStore {
    constructor() {
        this._typeDocumentComing = []
        this._typeNumberSubdivisions = []
        makeAutoObservable(this)
    }

    setTypeDocumentComing(type) {
        this._typeDocumentComing = type
    }

    setTypeNumberSubdivisions(number){
        this._typeNumberSubdivisions = number
    }

    get typeDocumentCharity() {
        return this._typeDocumentComing
    }



    get numberSubdivisions(){
        return this._typeNumberSubdivisions
    }

}