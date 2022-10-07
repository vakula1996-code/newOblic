import {makeAutoObservable, toJS} from "mobx";

export default class DocumentStore {
    constructor() {
        this._files = []
        this._document = []
        this._typeDocumentComing = []
        this._typeNumberSubdivisions = []
        this._listOrderNotRegister = []
        this._listOrderNotExecution = []
        this._documentConfirm = []
        this._documentConfirmChangedTechniques = []
        makeAutoObservable(this)
    }

    get Myfiles() {
        return toJS(this._files)
    }

    get document() {
        return toJS(this._document)
    }

    get typeDocumentCharity() {
        return this._typeDocumentComing
    }

    get numberSubdivisions() {
        return this._typeNumberSubdivisions
    }

    get listOrderNotRegister() {
        return this._listOrderNotRegister
    }

    get listOrderNotExecution() {
        return this._listOrderNotExecution
    }

    get documentConfirm() {
        return this._documentConfirm
    }

    get documentConfirmChangedTechniques() {
        return this._documentConfirmChangedTechniques
    }

    setFiles(files) {
        this._files = files
    }

    setDocument(doc) {
        this._document = doc
    }

    setTypeDocumentComing(type) {
        this._typeDocumentComing = type
    }

    setTypeNumberSubdivisions(number) {
        this._typeNumberSubdivisions = number
    }

    setListOrderNotRegister(list) {
        this._listOrderNotRegister = list
    }

    setListOrderNotExecution(list) {
        this._listOrderNotExecution = list
    }

    setDocumentConfirm(doc) {
        this._documentConfirm = doc
    }

    setDocumentConfirmChangedTechniques(doc) {
        this._documentConfirmChangedTechniques = doc
    }

}