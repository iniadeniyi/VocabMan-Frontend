import { useEffect, useState } from "react";
import WordDisplay from "../../components/WordDisplay/WordDisplay";
import Keyboard from "../../components/Keyboard/Keyboard";
import { saveGameState } from "../../utils/gameUtils";
import { useFetchWord } from "../../hooks/useFetchWord";
import styles from "./GamePage.module.css";
import { useGameStateContext } from "../../contexts/GameStateContext";
import GameOverModal from "../../components/GameOverModal/GameOverModal";

function GamePage() {
    const { data } = useFetchWord();

    const { gameState, setGameState, wordOfTheDay, setWordOfTheDay } =
        useGameStateContext();
    useEffect(() => {
        if (data) {
            const newWord = data.word.toUpperCase();
            const storedWord = localStorage.getItem("wordOfTheDay");

            if (newWord !== storedWord) {
                closeModal();
                localStorage.setItem("wordOfTheDay", newWord);
                setGameState({
                    guessedLetters: [],
                    remainingAttempts: 6,
                    gameStatus: "playing",
                    lastPlayed: new Date().toDateString(),
                });
            }
            setWordOfTheDay(newWord);
        }
    }, [data]);

    useEffect(() => {
        saveGameState(gameState);
    }, [gameState]);

    const handleKeyboardClick = (letter: string) => {
        if (!gameState.guessedLetters.includes(letter)) {
            const newGuessedLetters = [...gameState.guessedLetters, letter];
            const newRemainingAttempts = wordOfTheDay.includes(letter)
                ? gameState.remainingAttempts
                : gameState.remainingAttempts - 1;

            setGameState((prevState) => ({
                ...prevState,
                guessedLetters: newGuessedLetters,
                remainingAttempts: newRemainingAttempts,
            }));
        }
    };

    useEffect(() => {
        if (wordOfTheDay && wordOfTheDay.length > 0) {
            const isGameWon = wordOfTheDay
                .split("")
                .every((letter: string) =>
                    gameState.guessedLetters.includes(letter)
                );
            if (isGameWon) {
                setGameState((prevState) => ({
                    ...prevState,
                    gameStatus: "won",
                }));
            } else if (gameState.remainingAttempts <= 0) {
                setGameState((prevState) => ({
                    ...prevState,
                    gameStatus: "lost",
                }));
            }
        }
    }, [gameState.guessedLetters, gameState.remainingAttempts, wordOfTheDay]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (gameState.gameStatus === "won" || gameState.gameStatus === "lost") {
            setIsModalOpen(true);
        }
    }, [gameState.gameStatus]);

    const closeModal = () => {
        setIsModalOpen(false);
    };
    return (
        <div className={styles.gameContainer}>
            <div className={styles.infoSectionContainer}>
                Tries Left: {gameState.remainingAttempts}
            </div>
            <div className={styles.wordDisplayContainer}>
                <WordDisplay
                    key={wordOfTheDay}
                    word={wordOfTheDay}
                    guessedLetters={gameState.guessedLetters}
                />
            </div>
            <div className={styles.keyboardContainer}>
                <Keyboard
                    key={wordOfTheDay}
                    handleClick={handleKeyboardClick}
                    guessedLetters={gameState.guessedLetters}
                    isDisabled={gameState.gameStatus !== "playing"}
                />
            </div>

            <GameOverModal
                data={data}
                isOpen={isModalOpen}
                onClose={closeModal}
            />
        </div>
    );
}

export default GamePage;
