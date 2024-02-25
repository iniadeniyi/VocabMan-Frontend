import { useEffect, useState } from "react";
import WordDisplay from "../../components/WordDisplay/WordDisplay";
import Keyboard from "../../components/Keyboard/Keyboard";
import {
    saveGameState,
    loadGameState,
    getInitialGameState,
    evaluateGameStatus,
} from "../../utils/gameUtils";
import { useFetchWord } from "../../hooks/useFetchWord";
import styles from "./GamePage.module.css";
import { useGameStateContext } from "../../contexts/GameStateContext";
import GameOverModal from "../../components/GameOverModal/GameOverModal";
import { format } from "date-fns";

function GamePage() {
    const { data: wordData } = useFetchWord();
    const { gameState, setGameState } = useGameStateContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [wordOfTheDay, setWordOfTheDay] = useState("");

    useEffect(() => {
        const today = format(new Date(), "yyyy-MM-dd");
        const storedGameState = loadGameState();

        if (!storedGameState || storedGameState.lastPlayed !== today) {
            setGameState(getInitialGameState());
        } else {
            setGameState(storedGameState);
        }

        setWordOfTheDay(wordData ? wordData.word : "");
    }, [wordData]);

    const handleKeyboardClick = (letter: string) => {
        if (wordOfTheDay && !gameState.guessedLetters.includes(letter)) {
            const updatedGameState = {
                ...gameState,
                guessedLetters: [...gameState.guessedLetters, letter],
                remainingAttempts: wordOfTheDay.includes(letter)
                    ? gameState.remainingAttempts
                    : gameState.remainingAttempts - 1,
            };
            const newGameState = evaluateGameStatus(
                wordOfTheDay,
                updatedGameState
            );
            setGameState(newGameState);
            saveGameState(newGameState);
        }
    };

    useEffect(() => {
        if (gameState.gameStatus === "won" || gameState.gameStatus === "lost") {
            setIsModalOpen(true);
        }
    }, [gameState.gameStatus]);

    const closeModal = () => setIsModalOpen(false);

    return (
        <div className={styles.gameContainer}>
            <div className={styles.infoSectionContainer}>
                Tries Left: {gameState.remainingAttempts}
            </div>
            <WordDisplay
                key={`display-${wordOfTheDay}`}
                word={wordOfTheDay}
                guessedLetters={gameState.guessedLetters}
            />
            <Keyboard
                key={`keyboard-${wordOfTheDay}`}
                handleClick={handleKeyboardClick}
                guessedLetters={gameState.guessedLetters}
                isDisabled={gameState.gameStatus !== "playing"}
            />
            <GameOverModal
                data={wordData}
                isOpen={isModalOpen}
                onClose={closeModal}
            />
        </div>
    );
}

export default GamePage;
