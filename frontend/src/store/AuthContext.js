import { createContext } from "react";

export const AuthContext = createContext({

    authenticated: false,
    login: () => {
    },
    logout: () => {
    }

});

export const AUTHENTICATION_KEY = "authenticated";
