import { format } from "date-fns";
import { IGameState, IUser } from "../types";

export const getInitialGameState = (): IGameState => ({
    guessedLetters: [],
    remainingAttempts: 6,
    status: "playing",
    lastPlayed: format(new Date(), "yyyy-MM-dd"),
});

export const saveGameState = (gameState: IGameState, user: IUser | null) => {
    localStorage.setItem(
        `gameState_${user?.username}`,
        JSON.stringify(gameState)
    );
};

export const loadGameState = (user: IUser | null): IGameState | null => {
    const gameStateString = localStorage.getItem(`gameState_${user?.username}`);
    if (gameStateString) {
        return JSON.parse(gameStateString);
    }
    return null;
};

export const updateGameState = (
    gameState: IGameState,
    letter: string,
    isLetterInWord: boolean
): IGameState => {
    return {
        ...gameState,
        guessedLetters: [...gameState.guessedLetters, letter],
        remainingAttempts: isLetterInWord
            ? gameState.remainingAttempts
            : gameState.remainingAttempts - 1,
    };
};

export const evaluateGameStatus = (
    word: string,
    gameState: IGameState
): IGameState => {
    const isWon = word
        .split("")
        .every((letter) => gameState.guessedLetters.includes(letter));
    const isLost = gameState.remainingAttempts <= 0;

    return {
        ...gameState,
        status: isWon ? "won" : isLost ? "lost" : "playing",
    };
};
