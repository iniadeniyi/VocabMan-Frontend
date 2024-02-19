export interface GameState {
    guessedLetters: string[];
    remainingAttempts: number;
    gameStatus: "playing" | "won" | "lost";
    lastPlayed: string | null;
}

export const initialState: GameState = {
    guessedLetters: [],
    remainingAttempts: 6,
    gameStatus: "playing",
    lastPlayed: null,
};

export const saveGameState = (gameState: GameState) => {
    localStorage.setItem("gameState", JSON.stringify(gameState));
};

export const loadGameState = (): GameState => {
    const gameState = localStorage.getItem("gameState");
    return gameState ? JSON.parse(gameState) : { ...initialState };
};

export const hasPlayedToday = (): boolean | null => {
    const gameState = loadGameState();
    return gameState && gameState.lastPlayed === new Date().toDateString();
};

export const isGameCompleted = (): boolean | null => {
    const gameState = loadGameState();
    return (
        gameState &&
        (gameState.gameStatus === "won" || gameState.gameStatus === "lost")
    );
};
