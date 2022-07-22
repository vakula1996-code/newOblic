import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        this._status = false
        this._jwtDate = ""
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(user) {
        this._user = user
    }

    setStatus(status){
        this._status = status
    }

    setDateJWT(date){
        this._jwtDate =date
    }

    get isAuth() {
        return this._isAuth
    }
    get user() {
        return this._user
    }

    get status() {
        return this._status
    }

    get dateJWT(){
        return this._jwtDate
    }
}