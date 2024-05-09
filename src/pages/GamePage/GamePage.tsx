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
import SidePanel from "../../components/SidePanel/SidePanel";

import { useUser } from "../../contexts/UserContext";
import useCurrentUser from "../../hooks/useCurrentUser";
import useDailyChallenge from "../../hooks/useDailyChallenge";
import { useLogActivity } from "../../hooks/useLogActivity";

function GamePage() {
    const { data: wordData, isLoading } = useFetchWord();
    const { mutate: logActivity } = useLogActivity();

    const { data: userData } = useCurrentUser();

    const [date] = useState(() => format(new Date(), "yyyy-MM-dd"));
    const { data: challenge } = useDailyChallenge(date);

    const { gameState, setGameState } = useGameStateContext();
    const { setCurrentUser } = useUser();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [wordOfTheDay, setWordOfTheDay] = useState("");

    useEffect(() => {
        setCurrentUser(userData);
    }, [userData]);

    useEffect(() => {
        const today = format(new Date(), "yyyy-MM-dd");
        const storedGameState = loadGameState();

        if (!storedGameState || storedGameState.lastPlayed !== today) {
            setGameState(getInitialGameState());
        } else {
            setGameState(storedGameState);
        }

        setWordOfTheDay(
            challenge ? challenge.wordDetails.word.toUpperCase() : ""
        );
    }, [challenge]);

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
        if (
            challenge &&
            (gameState.gameStatus === "won" || gameState.gameStatus === "lost")
        ) {
            setIsModalOpen(true);
            logActivity({ challengeId: challenge._id, stars: 3 });
        }
    }, [gameState.gameStatus, challenge]);

    const closeModal = () => setIsModalOpen(false);

    return (
        <div>
            <SidePanel />

            <div className={styles.gameContainer}>
                <div className={styles.infoSectionContainer}>
                    Tries Left: {gameState.remainingAttempts}
                </div>
                <div className={styles.interactionWrapper}>
                    {isLoading ? (
                        <div className={styles.loader}>Loading...</div>
                    ) : (
                        <WordDisplay
                            key={`display-${wordOfTheDay}`}
                            word={wordOfTheDay}
                            guessedLetters={gameState.guessedLetters}
                        />
                    )}
                    <Keyboard
                        key={`keyboard-${wordOfTheDay}`}
                        handleClick={handleKeyboardClick}
                        guessedLetters={gameState.guessedLetters}
                        isDisabled={gameState.gameStatus !== "playing"}
                    />
                </div>
                <GameOverModal
                    data={wordData}
                    isOpen={isModalOpen}
                    onClose={closeModal}
                />
            </div>
        </div>
    );
}

export default GamePage;
