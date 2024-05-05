import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

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
    };

    const logout = () => {
        localStorage.removeItem("token");
        setAuthToken(null);
    };

    return (
        <AuthContext.Provider value={{ authToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
