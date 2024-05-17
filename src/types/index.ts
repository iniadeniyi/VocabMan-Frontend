export interface IAuthResponse {
    token: string;
    user: IUser;
}
export interface IGameState {
    guessedLetters: string[];
    remainingAttempts: number;
    status: string;
    lastPlayed: string;
    rating: number;
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
