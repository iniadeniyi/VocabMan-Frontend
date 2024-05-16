import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import { GameProvider } from "./contexts/GameContext";

import AuthPage from "./pages/AuthPage/AuthPage";
import HomePage from "./pages/HomePage/HomePage";

import { ProtectedRoute } from "./components/ProtectedRoute";
import { PublicRoute } from "./components/PublicRoute";

import "./App.css";

const queryClient = new QueryClient();

function App() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <GameProvider>
                        <Router>
                            <Routes>
                                <Route
                                    path="/auth"
                                    element={
                                        <PublicRoute>
                                            <AuthPage />
                                        </PublicRoute>
                                    }
                                />
                                <Route
                                    path="/"
                                    element={
                                        <ProtectedRoute>
                                            <HomePage />
                                        </ProtectedRoute>
                                    }
                                />
                            </Routes>
                        </Router>
                    </GameProvider>
                </AuthProvider>
            </QueryClientProvider>
        </>
    );
}

export default App;
