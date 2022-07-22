//Головні
export const LOCAL_URLS ="http://127.0.0.1:8000/"
export const GLOBAL_URLS = 'http://192.168.0.93:8000/'


//Аунтентифікація
export const LOGIN = 'api/login'
export const CHECK_TOKEN = 'api/checkToken'



//Рути
export const COMING_CHARITY = '/charity'
export const COMING_OUTFIT = '/outfit'
export const COMING_PURCHASE = '/purchase'

export const MOVE_TO_FORM = '/moveToForm'
export const MOVE_REGISTRATION = '/moveRegistration'
export const MOVE_CONFIRM_TRANSMISSION = '/moveConfirmTransmission'


//Типи
export const TYPE_DOCUMENT_NAME = (id)=> 'api/documentNames?type='+id
export const TYPE_SUBDIVISION_NAME = 'api/subdivisions'
export const TYPE_MEASUREMENTS_NAME = 'api/measurements'
export const TYPE_CATEGORY_NAME= (id) => 'api/category?type='+id
export const TYPE_TECHNIQUE = 'api/techniqueType'
export const TYPE_TECHNIQUE_NAME = 'api/techniqueName'