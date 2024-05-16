import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

import { useAuthContext } from "../contexts/AuthContext";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const { user } = useAuthContext();

    if (!user) {
        return <Navigate to="/auth" replace />;
    }

    return children;
};
