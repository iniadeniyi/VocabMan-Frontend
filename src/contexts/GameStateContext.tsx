import { ReactNode, createContext, useContext, useState } from "react";
import { GameState, loadGameState } from "../utils/gameUtils";

interface GameStateContextType {
    gameState: GameState;
    setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

interface GameProviderProps {
    children: ReactNode;
}

const GameStateContext = createContext<GameStateContextType>(
    {} as GameStateContextType
);

export const GameStateProvider: React.FC<GameProviderProps> = ({
    children,
}) => {
    const [gameState, setGameState] = useState<GameState>({} as GameState);

    const contextValue = {
        gameState,
        setGameState,
    };

    return (
        <GameStateContext.Provider value={contextValue}>
            {children}
        </GameStateContext.Provider>
    );
};

export const useGameStateContext = (): GameStateContextType => {
    const context = useContext(GameStateContext);
    if (!context) {
        throw new Error("useGameContext must be used within a GameProvider");
    }
    return context;
};
