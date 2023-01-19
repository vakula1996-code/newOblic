import React from "react";
import {
    ADMIN_PANEL_DOCUMENTS_NAME,
    ADMIN_PANEL_MEASUREMENT,
    ADMIN_PANEL_RECORD,
    ADMIN_PANEL_SUBDIVISION,
    ADMIN_PANEL_TYPE,
    ADMIN_PANEL_TYPE_ENSURING,
    ADMIN_PANEL_USERS,
    AUTH,
    COMING_CHARITY,
    COMING_OUTFIT,
    COMING_PURCHASE,
    DEREGISTRATION_MOVE,
    DEREGISTRATION_REPAIR,
    DETAIL_LOOK_TECHNIQUE,
    ENSURING,
    INVENTORY,
    LOOK_DOCUMENTS,
    MOVE_CONFIRM_TRANSMISSION,
    MOVE_DOCUMENT_EXECUTION,
    MOVE_REGISTRATION,
    MOVE_TO_FORM,
    REPORT_FOR_SUBDIVISION
} from "./utils/const";
import ComingCharity from "./pages/coming/ComingCharity";
import ComingOutfit from "./pages/coming/ComingOutfit";
import ComingPurchase from "./pages/coming/СomingPurchase";
import MoveToFormOutfit from "./pages/move/MoveToFormOutfit";
import MoveRegistrationOutfit from "./pages/move/MoveRegistrationOutfit";
import MoveConfirmTransmission from "./pages/move/MoveConfirmTransmission";
import ReportForSubdivision from "./pages/report/reportForSubdivision";
import DetailLookTechnique from "./pages/report/detailLookTechnique";
import ReportEnsuring from "./pages/report/reportEnsuring";
import DeregistrationRepair from "./pages/deregistration/DeregistrationRepair";
import DeregistrationMove from "./pages/deregistration/DeregistrationMove";
import AdminPanelDocumentsName from "./pages/adminPanel/adminPanelDocumentsName";
import AdminPanelSubdivision from "./pages/adminPanel/adminPanelSubdivision";
import AdminPanelType from "./pages/adminPanel/adminPanelType";
import AdminPanelTypeEnsuring from "./pages/adminPanel/adminPanelTypeEnsuring";
import AdminPanelMeasurement from "./pages/adminPanel/adminPanelMeasurement";
import AdminPanelRecord from "./pages/adminPanel/adminPanelRecord";
import AdminPanelUsers from "./pages/adminPanel/adminPanelUsers";
import LookDocuments from "./pages/report/lookDocuments";
import MoveDocumentExecution from "./pages/move/MoveDocumentExecution";
import InventoryForSubdivision from "./pages/inventory/InventoryForSubdivision";
import AuthPage from "./pages/auth/authPage";


export const authRouter = [
    {
        path: COMING_CHARITY,
        Component: <ComingCharity/>
    },
    {
        path: COMING_OUTFIT,
        Component: <ComingOutfit/>
    },
    {
        path: COMING_PURCHASE,
        Component: <ComingPurchase/>
    },
    {
        path: MOVE_TO_FORM,
        Component: <MoveToFormOutfit/>
    },
    {
        path: MOVE_REGISTRATION,
        Component: <MoveRegistrationOutfit/>
    },
    {
        path: MOVE_CONFIRM_TRANSMISSION,
        Component: <MoveConfirmTransmission/>
    },
    {
        path: MOVE_DOCUMENT_EXECUTION,
        Component: <MoveDocumentExecution/>
    },
    {
        path: REPORT_FOR_SUBDIVISION,
        Component: <ReportForSubdivision/>
    },
    {
        path: DETAIL_LOOK_TECHNIQUE + '/:subdivisionId' + '/:id' + '/:categoryId',
        Component: <DetailLookTechnique/>
    },

    {
        path: DEREGISTRATION_REPAIR,
        Component: <DeregistrationRepair/>
    },
    {
        path: DEREGISTRATION_MOVE,
        Component: <DeregistrationMove/>
    },
    {
        path: LOOK_DOCUMENTS,
        Component: <LookDocuments/>
    },
    {
        path: INVENTORY,
        Component: <InventoryForSubdivision/>
    },

]

export const publicRoutes = [
    {
        path: AUTH,
        Component: <AuthPage/>
    },
]

export const adminRoutes = [
    {
        path: ADMIN_PANEL_SUBDIVISION,
        Component: <AdminPanelSubdivision/>
    },
    {
        path: ADMIN_PANEL_TYPE,
        Component: <AdminPanelType/>
    },
    {
        path: ADMIN_PANEL_TYPE_ENSURING,
        Component: <AdminPanelTypeEnsuring/>
    },
    {
        path: ADMIN_PANEL_MEASUREMENT,
        Component: <AdminPanelMeasurement/>
    },
    {
        path: ADMIN_PANEL_DOCUMENTS_NAME,
        Component: <AdminPanelDocumentsName/>
    },
    {
        path: ADMIN_PANEL_RECORD,
        Component: <AdminPanelRecord/>
    },
    {
        path: ADMIN_PANEL_USERS,
        Component: <AdminPanelUsers/>
    },
    {
        path: ENSURING,
        Component: <ReportEnsuring/>
    },
]