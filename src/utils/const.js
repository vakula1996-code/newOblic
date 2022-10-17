//Головні
// export const LOCAL_URLS = "http://127.0.0.1:8000/"
export const LOCAL_URLS = "http://127.0.0.1:8000/"
// export const LOCAL_URLS = "http://192.168.0.93:8080/"
// export const GLOBAL_URLS = 'http://192.168.0.11:8000/'
// export const GLOBAL_URLS = "http://192.168.0.93:8080/"
// export const LOCAL_URLS = 'http://192.168.0.11:8000/'
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
export const MOVE_DOCUMENT_EXECUTION = '/moveDocumentExecution'

export const DEREGISTRATION_REPAIR = '/deregistrationRepair'
export const DEREGISTRATION_MOVE = '/deregistrationMove'

export const REPORT_FOR_SUBDIVISION = '/reportForSubdivision'
export const DETAIL_LOOK_TECHNIQUE = '/detailLookTechnique'

export const ENSURING = '/techniqueEnsuring'

export const ADMIN_PANEL = '/adminPanel'


export const ADMIN_PANEL_SUBDIVISION = '/adminPanelSubdivision'
export const ADMIN_PANEL_TYPE = '/adminPanelType'
export const ADMIN_PANEL_TYPE_ENSURING = '/adminPanelTypeEnsuring'
export const ADMIN_PANEL_MEASUREMENT = '/adminPanelMeasurement'
export const ADMIN_PANEL_DOCUMENTS_NAME = '/adminPanelDocumentsName'
export const ADMIN_PANEL_RECORD = '/adminPanelRecord'
export const ADMIN_PANEL_USERS = '/adminPanelUsers'


export const LOOK_DOCUMENTS = '/documents'


//Типи
export const TYPE_DOCUMENT_NAME = (id) => 'api/documentNames?type=' + id
export const TYPE_SUBDIVISION_NAME = 'api/subdivisions'
export const TYPE_SUBDIVISION_NAME_ALL = 'api/subdivisions?type=inner'
export const TYPE_MEASUREMENTS_NAME = 'api/measurements'
export const TYPE_CATEGORY_NAME = (id) => 'api/category?type=' + id
export const TYPE_TECHNIQUE = 'api/techniqueType'
export const TYPE_TECHNIQUE_NAME = 'api/techniqueName'
export const TYPE_ENSURING = 'api/ensuringType'

//Техніка
export const ADD_NEW_TECHNIQUE = (type) => 'api/coming?type=' + type
export const ADD_NEW_TECHNIQUE_OUTFIT = 'api/coming?type=outfit'
export const CREATE_ORDER = 'api/createOrder'
export const SUBDIVISIONS_TECHNIQUES = (id) => 'api/subdivisions/' + id + '/techniques'
export const LOOK_TECHNIQUE = (id) => 'api/subdivisions/' + id + '/techniques'
export const TECHNIQUE_INFORMATION = (id) => 'api/subdivisions/+' + id + '+/techniques/info'
export const TECHNIQUE_HISTORY = (id) => 'api/subdivisions/' + id + '/techniques/history'
export const TECHNIQUE_ENSURING = (id) => 'api/subdivisions/' + id + '/techniques/ensuring'
export const MODERNIZATION = 'api/modernization'
export const DECOMMISSIONED = 'api/decommissioned'

//Документи
export const ORDER_NOT_REGISTER = (id) => 'api/subdivisions/' + id + '/documents/orderNotRegister'
export const ORDER_NOT_EXECUTION = (id) => 'api/subdivisions/' + id + '/documents/orderNotExecution'
export const REGISTER_ORDER = 'api/registerOrder'
export const EXECUTION_ORDER = 'api/executionOrder'
export const DOCUMENT_HISTORY = (id) => 'api/subdivisions/' + id + '/documents/history'
export const DOCUMENT_ALL = (id) => 'api/subdivisions/' + id + '/documents'
export const DOCUMENT_DOWNLOAD_SCAN = (idSubdivision, idDocument) => 'api/subdivisions/' + idSubdivision + '/documents/' + idDocument + '/scan'
export const DOCUMENT_DOWNLOAD_DOC = (idSubdivision, idDocument) => 'api/subdivisions/' + idSubdivision + '/documents/' + idDocument + '/doc'
export const DOCUMENT_NOT_EXECUTION_OR_NOT_REGISTER = (idSubdivision) => 'api/subdivisions/' + idSubdivision + '/documents/orderNotExecutionOrRegister'
export const DOCUMENT_CANCEL_ORDER = 'api/cancelOrder'
export const UPLOAD = 'api/upload'