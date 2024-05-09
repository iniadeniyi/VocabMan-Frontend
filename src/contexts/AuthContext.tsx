import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { jwtDecode } from "jwt-decode";

interface IAuthContext {
    authToken: string | null;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [authToken, setAuthToken] = useState(() =>
        localStorage.getItem("token")
    );

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setAuthToken(token);
        }
    }, []);

    const login = (token: string) => {
        localStorage.setItem("token", token);
        setAuthToken(token);
        if (token && !isTokenExpired(token)) {
            scheduleLogout(jwtDecode(token).exp!);
        } else {
            logout();
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setAuthToken(null);
    };

    const isTokenExpired = (token: string) => {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decoded.exp! < currentTime;
    };

    const scheduleLogout = (expirationTime: number) => {
        const logoutTime = expirationTime * 1000 - Date.now();
        setTimeout(() => {
            logout();
        }, logoutTime);
    };

    return (
        <AuthContext.Provider value={{ authToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
