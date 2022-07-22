import React from "react";
import {
    COMING_CHARITY,
    COMING_OUTFIT,
    COMING_PURCHASE,
    MOVE_CONFIRM_TRANSMISSION,
    MOVE_REGISTRATION,
    MOVE_TO_FORM
} from "./utils/const";
import ComingCharity from "./pages/coming/ComingCharity";
import ComingOutfit from "./pages/coming/ComingOutfit";
import ComingPurchase from "./pages/coming/СomingPurchase";
import MoveToFormOutfit from "./pages/move/MoveToFormOutfit";
import MoveRegistrationOutfit from "./pages/move/MoveRegistrationOutfit";
import MoveConfirmTransmission from "./pages/move/MoveConfirmTransmission";


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
]