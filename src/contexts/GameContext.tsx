import { ReactNode, createContext, useContext, useState } from "react";

import { getInitialGameState } from "../utils/gameUtils";

import { IGameState, IWord } from "../types";

interface IGameContext {
    word: IWord | undefined;
    setWord: React.Dispatch<React.SetStateAction<IWord | undefined>>;
    gameState: IGameState;
    setGameState: React.Dispatch<React.SetStateAction<IGameState>>;
}

interface GameProviderProps {
    children: ReactNode;
}

const GameContext = createContext<IGameContext>({} as IGameContext);

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
    const [word, setWord] = useState<IWord | undefined>();
    const [gameState, setGameState] = useState<IGameState>(
        getInitialGameState()
    );

    const contextValue = {
        word,
        setWord,
        gameState,
        setGameState,
    };

    return (
        <GameContext.Provider value={contextValue}>
            {children}
        </GameContext.Provider>
    );
};

export const useGameContext = (): IGameContext => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error("useGameContext must be used within a GameProvider");
    }
    return context;
};
