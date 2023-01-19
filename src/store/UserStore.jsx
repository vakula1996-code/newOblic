import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = true
        this._role = ''
        this._user = {}
        this._status = false
        this._jwtDate = ""
        makeAutoObservable(this)
    }


    get isAuth() {
        return this._isAuth
    }

    get role() {
        return this._role
    }

    get user() {
        return this._user
    }

    get status() {
        return this._status
    }

    get dateJWT() {
        return this._jwtDate
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }

    setRole(role) {
        this._role = role
    }

    setUser(user) {
        this._user = user
    }

    setStatus(status) {
        this._status = status
    }

    setDateJWT(date) {
        this._jwtDate = date
    }
}