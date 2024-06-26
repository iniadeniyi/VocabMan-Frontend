import { format } from "date-fns";
import { IGameState, IUser } from "../types";

export const getInitialGameState = (): IGameState => ({
    guessedLetters: [],
    remainingAttempts: 6,
    status: "playing",
    lastPlayed: format(new Date(), "yyyy-MM-dd"),
    rating: 0,
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

    const updatedGameState = {
        ...gameState,
        status: isWon ? "won" : isLost ? "lost" : "playing",
    };

    if (isWon || isLost) {
        const rating = calculateRating(updatedGameState, word);
        return { ...updatedGameState, rating };
    }

    return updatedGameState;
};

export const calculateRating = (
    gameState: IGameState,
    word: string
): number => {
    const totalLetters = new Set(word).size;
    const correctGuesses = gameState.guessedLetters.filter((letter) =>
        word.includes(letter)
    ).length;
    const incorrectGuesses = 6 - gameState.remainingAttempts;

    const scoreCorrect = correctGuesses / totalLetters;

    const penalty = incorrectGuesses * 0.3;

    let rating = scoreCorrect * 5 - penalty;
    rating = Math.max(0, Math.min(5, rating));

    return parseFloat(rating.toFixed(1));
};
