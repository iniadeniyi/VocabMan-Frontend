import React, { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";

import { useGameContext } from "../../contexts/GameContext";
import { useDailyChallenge } from "../../hooks/useDailyChallenge";
import { useLogActivity } from "../../hooks/useLogActivity";

import WordDisplay from "../WordDisplay/WordDisplay";
import Keyboard from "../Keyboard/Keyboard";

import {
    getInitialGameState,
    evaluateGameStatus,
    loadGameState,
    saveGameState,
    updateGameState,
} from "../../utils/gameUtils";

import styles from "./GameWindow.module.css";
import GameOverModal from "../GameOverModal/GameOverModal";
import { useAuthContext } from "../../contexts/AuthContext";
import useCurrentUser from "../../hooks/useCurrentUser";

const GameWindow: React.FC = () => {
    const today = format(new Date(), "yyyy-MM-dd");

    const { gameState, setGameState, word, setWord } = useGameContext();
    const { user, updateCurrentUser } = useAuthContext();

    const { data: currentUser, isLoading: isFetchingUser } = useCurrentUser();

    useEffect(() => {
        if (!isFetchingUser) updateCurrentUser(currentUser);
    }, [isFetchingUser, updateCurrentUser, currentUser]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activityLogged, setActivityLogged] = useState(false);

    const { mutate: logActivity } = useLogActivity();
    const { data: challenge } = useDailyChallenge(today);

    const resetGameState = useCallback(() => {
        setGameState(getInitialGameState());
    }, [setGameState, today]);

    useEffect(() => {
        const prevGameState = loadGameState(user);
        if (prevGameState?.lastPlayed === today) {
            setGameState(prevGameState);
        } else {
            resetGameState();
        }
    }, [today, user, setGameState, resetGameState]);

    useEffect(() => {
        if (challenge) {
            setWord(challenge.wordDetails);
            resetGameState();
        }
    }, [challenge, setWord, resetGameState]);

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            const key = event.key.toUpperCase();
            if (key.length === 1 && key >= "A" && key <= "Z") {
                handleKeyboardClick(key);
            }
        };

        window.addEventListener("keydown", handleKeyPress);
        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [word, gameState]);

    useEffect(() => {
        if (word && gameState.status !== "playing" && !activityLogged) {
            setIsModalOpen(true);
            logActivity({
                challengeId: challenge?._id,
                rating: gameState.rating,
            });
            setActivityLogged(true);
        }
    }, [gameState.status, word, challenge, logActivity, activityLogged]);

    const handleKeyboardClick = (letter: string) => {
        if (!word || gameState.guessedLetters.includes(letter)) return;

        const isLetterInWord = word.word.includes(letter);
        const updatedGameState = updateGameState(
            gameState,
            letter,
            isLetterInWord
        );
        const newGameState = evaluateGameStatus(word.word, updatedGameState);

        setGameState(newGameState);
        saveGameState(newGameState, user);
    };

    return (
        <div className={styles.container}>
            <h4 className={styles.prompt}>Daily Challenge: {today}</h4>
            <div className={styles.infoSectionContainer}>
                Tries Left: {gameState.remainingAttempts}
            </div>
            <div className={styles.interactionWrapper}>
                {!word ? (
                    <p>Fetching today's challenge...</p>
                ) : (
                    <WordDisplay
                        key={`display-${word.word}`}
                        word={word.word}
                        guessedLetters={gameState.guessedLetters}
                    />
                )}
                {gameState.status !== "playing" && (
                    <button onClick={() => setIsModalOpen(true)}>
                        See Word of the Day
                    </button>
                )}
                <Keyboard
                    key={`keyboard-${today}`}
                    handleClick={handleKeyboardClick}
                    guessedLetters={gameState.guessedLetters}
                    isDisabled={gameState.status !== "playing"}
                />
            </div>
            <GameOverModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default GameWindow;
