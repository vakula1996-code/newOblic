import React, {useContext} from 'react';
import {adminRoutes, authRouter, publicRoutes} from "../routes";
import {Navigate, Route, Routes,} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const AppRouter = observer(() => {
    const {user} = useContext(Context)

    return (
        <Routes>
            {
                user.isAuth &&
                authRouter.map(({path, Component}, index) =>
                    <Route key={index} path={path} element={Component} exact/>
                )}
            {user.isAuth && user.role === 'admin' &&
                adminRoutes.map(({path, Component}, index) =>
                    <Route key={index} path={path} element={Component} exact/>
                )
            }
            {user.isAuth === false &&
                publicRoutes.map(({path, Component}, index) =>
                    <Route key={index} path={path} element={Component} exact/>
                )}
            <Route path='/' element={<Navigate to='/auth' replace/>}/>
        </Routes>
    );
});
export default AppRouter;