import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

import { IUser } from "../types";

interface IAuthContext {
    user: IUser | null;
    logIn: (token: string, user: IUser) => void;
    logOut: () => void;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (token) {
            const decoded = jwtDecode<{ exp: number }>(token);
            if (decoded.exp * 1000 > Date.now()) {
                setUser(storedUser ? JSON.parse(storedUser) : null);
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${token}`;
            }
        }

        const setupInterceptors = () => {
            const onResponseError = (error: {
                response: { status: number };
            }) => {
                if (error.response && error.response.status === 401) {
                    logOut();
                }
                return Promise.reject(error);
            };

            const interceptor = axios.interceptors.response.use(
                (response) => response,
                onResponseError
            );

            return () => {
                axios.interceptors.response.eject(interceptor);
            };
        };

        return setupInterceptors();
    }, []);

    const logIn = (token: string, user: IUser) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    };

    const logOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        delete axios.defaults.headers.common["Authorization"];
    };

    const value = { user, logIn, logOut };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error(
            "useAuthContext must be used within a UserAuthProvider"
        );
    }
    return context;
};
