import { Outlet } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import { useEffect, useState } from "react";
import { AuthContext, AUTHENTICATION_KEY } from "../store/AuthContext";
import LoginPage from "./LoginPage";


function RootLayout() {
    const [authenticated, setAuthentication] = useState();

    function login() {
        sessionStorage.setItem(AUTHENTICATION_KEY, true);
        setAuthentication(true);
    }

    function logout() {
        setAuthentication(false);
        sessionStorage.removeItem(AUTHENTICATION_KEY);
    }

    useEffect(() => {
        const authenticatedCache = sessionStorage.getItem(AUTHENTICATION_KEY);
        setAuthentication(authenticatedCache);
    }, [])

    const autContextValue = {
        authenticated: authenticated,
        login: login,
        logout: logout
    }

    return (
        <AuthContext.Provider value={autContextValue}>
            {!authenticated && <LoginPage/>}
            {authenticated && <>
                <MainNavigation/>
                <main>
                    <Outlet/>
                </main>
            </>}

        </AuthContext.Provider>
    );


}

export default RootLayout;
