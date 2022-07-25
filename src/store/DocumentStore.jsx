import {makeAutoObservable, toJS} from "mobx";

export default class DocumentStore {
    constructor() {
        this._document = []
        this._typeDocumentComing = []
        this._typeNumberSubdivisions = []
        makeAutoObservable(this)
    }

    setDocument(doc){
        this._document = doc
    }

    setTypeDocumentComing(type) {
        this._typeDocumentComing = type
    }

    setTypeNumberSubdivisions(number){
        this._typeNumberSubdivisions = number
    }

    get document(){
        return toJS(this._document)
    }

    get typeDocumentCharity() {
        return this._typeDocumentComing
    }

    get numberSubdivisions(){
        return this._typeNumberSubdivisions
    }

}