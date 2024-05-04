import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import GamePage from "./pages/GamePage/GamePage";

import "./App.css";
import { GameStateProvider } from "./contexts/GameStateContext";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";

const queryClient = new QueryClient();

function App() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <GameStateProvider>
                    <Router>
                        <Routes>
                            <Route path="/auth" element={<AuthPage />} />
                            <Route path="/" element={<HomePage />} />
                            <Route path="/play" element={<GamePage />} />
                        </Routes>
                    </Router>
                </GameStateProvider>
            </QueryClientProvider>
        </>
    );
}

export default App;
