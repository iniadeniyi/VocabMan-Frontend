import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import { GameStateProvider } from "./contexts/GameStateContext";
import { UserProvider } from "./contexts/UserContext";

import AuthPage from "./pages/AuthPage/AuthPage";
import GamePage from "./pages/GamePage/GamePage";
import HomePage from "./pages/HomePage/HomePage";

import "./App.css";
import { ProtectedRoute } from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

const queryClient = new QueryClient();

function App() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <UserProvider>
                        <GameStateProvider>
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
                                    <Route
                                        path="/play"
                                        element={
                                            <ProtectedRoute>
                                                <GamePage />
                                            </ProtectedRoute>
                                        }
                                    />
                                </Routes>
                            </Router>
                        </GameStateProvider>
                    </UserProvider>
                </AuthProvider>
            </QueryClientProvider>
        </>
    );
}

export default App;
