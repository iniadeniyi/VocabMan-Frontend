export interface IAuthResponse {
    token: string;
    user: IUser;
}
export interface IGameState {
    guessedLetters: string[];
    remainingAttempts: number;
    status: "playing" | "won" | "lost";
    lastPlayed: string;
}
export interface IUser {
    username: string;
    currentStreak: number;
    longestStreak: number;
    createdAt: string;
}

export interface IWord {
    word: string;
    definition: string;
    difficulty: number;
}
