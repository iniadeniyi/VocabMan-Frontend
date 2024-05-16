import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { ReactNode } from "react";

export const PublicRoute = ({ children }: { children: ReactNode }) => {
    const { user } = useAuthContext();

    if (user) {
        return <Navigate to="/" replace />;
    }

    return children;
};
