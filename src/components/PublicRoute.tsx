import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ReactNode } from "react";

const PublicRoute = ({ children }: { children: ReactNode }) => {
    const { authToken } = useAuth();

    if (authToken) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PublicRoute;
