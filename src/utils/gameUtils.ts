import { format } from "date-fns";

export interface GameState {
    guessedLetters: string[];
    remainingAttempts: number;
    gameStatus: "playing" | "won" | "lost";
    lastPlayed: string;
}

export const getInitialGameState = (): GameState => ({
    guessedLetters: [],
    remainingAttempts: 6,
    gameStatus: "playing",
    lastPlayed: format(new Date(), "yyyy-MM-dd"),
});

export const saveGameState = (gameState: GameState) => {
    localStorage.setItem("gameState", JSON.stringify(gameState));
};

export const loadGameState = (): GameState | null => {
    const gameStateString = localStorage.getItem("gameState");
    return gameStateString ? JSON.parse(gameStateString) : null;
};

export const evaluateGameStatus = (
    word: string,
    gameState: GameState
): GameState => {
    const isWon = word
        .split("")
        .every((letter) => gameState.guessedLetters.includes(letter));

    const isLost = gameState.remainingAttempts <= 0;

    return {
        ...gameState,
        gameStatus: isWon ? "won" : isLost ? "lost" : "playing",
    };
};
