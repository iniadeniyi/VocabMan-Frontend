import { ReactNode, createContext, useContext, useState } from "react";
import { GameState, loadGameState } from "../utils/gameUtils";

interface GameStateContextType {
    gameState: GameState;
    setGameState: React.Dispatch<React.SetStateAction<GameState>>;
    wordOfTheDay: string;
    setWordOfTheDay: React.Dispatch<React.SetStateAction<string>>;
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
    const [gameState, setGameState] = useState<GameState>(loadGameState());
    const [wordOfTheDay, setWordOfTheDay] = useState<string>("");

    const contextValue = {
        gameState,
        setGameState,
        wordOfTheDay,
        setWordOfTheDay,
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
