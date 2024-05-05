import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

import { useAuth } from "../contexts/AuthContext";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const { authToken } = useAuth();

    if (!authToken) {
        return <Navigate to="/auth" replace />;
    }

    return children;
};
