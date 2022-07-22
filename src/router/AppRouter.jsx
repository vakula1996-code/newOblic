import React from 'react';
import {authRouter} from "../routes";
import {
    Route, Routes,
} from "react-router-dom";
const AppRouter = () => {
    return (
            <Routes>
                {authRouter.map(({path,Component},index)=>
                    <Route key={index} path={path} element={Component} exact/>
                )}
            </Routes>
    );
};

export default AppRouter;