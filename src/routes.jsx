import React from "react";
import {
    ADMIN_PANEL,
    COMING_CHARITY,
    COMING_OUTFIT,
    COMING_PURCHASE,
    DEREGISTRATION_MOVE,
    DEREGISTRATION_REPAIR,
    DETAIL_LOOK_TECHNIQUE,
    ENSURING,
    MOVE_CONFIRM_TRANSMISSION,
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
import AdminPanelAddData from "./pages/adminPanel/adminPanelAddData";
import DeregistrationRepair from "./pages/deregistration/DeregistrationRepair";
import DeregistrationMove from "./pages/deregistration/DeregistrationMove";


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
        path: REPORT_FOR_SUBDIVISION,
        Component: <ReportForSubdivision/>
    },
    {
        path: DETAIL_LOOK_TECHNIQUE + '/:subdivisionId' + '/:id' + '/:categoryId',
        Component: <DetailLookTechnique/>
    },
    {
        path: ENSURING,
        Component: <ReportEnsuring/>
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
        path: ADMIN_PANEL,
        Component: <AdminPanelAddData/>
    },
]