import React, { useState, useContext, createContext } from "react";
import Cookie from "js-cookie";
import endPoints from "@services/api";
import { makeFetch } from "./useFetch";

const AuthContext = createContext();

export function ProviderAuth({ children }) {
    const auth = useProviderAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    return useContext(AuthContext);
};

function useProviderAuth() {
    const [user, setUser] = useState(null);
    const signIn = async (email, password) => {
        try {
            const response = await makeFetch(endPoints.auth.login, "POST", { email, password });
            const { access_token } = await response.json();
            if (!access_token) throw new Error("No access token");
            Cookie.set("access_token", access_token, { expires: 5 });

            const { name } = await (await makeFetch(endPoints.auth.profile)).json();
            setUser(name);
        } catch (error) {
            throw new Error(error.message);
        }
    };

    const logout = async () => {
        try {
            Cookie.remove("access_token");
            setUser(null);
            window.location.href = "/login";
        } catch (error) {
            throw new Error("Service logout unavailable");
        }
    };

    return { user, signIn, logout };
}
