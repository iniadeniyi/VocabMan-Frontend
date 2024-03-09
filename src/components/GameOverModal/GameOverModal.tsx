import { useEffect, useState } from "react";
import { WordData } from "../../hooks/useFetchWord";
import styles from "./GameOverModal.module.css";
import { loadGameState } from "../../utils/gameUtils";
interface GameOverModalProps {
    data?: WordData;
    isOpen: boolean;
    onClose: () => void;
}

function GameOverModal({ data, isOpen, onClose }: GameOverModalProps) {
    if (!isOpen) return null;
    if (!data) return null;

    const [statusMessage, setStatusMessage] = useState("");

    useEffect(() => {
        const gameState = loadGameState();
        const status = gameState?.gameStatus;
        if (status === "won") {
            setStatusMessage("Congratulations! You've won today's challenge!");
        } else if (status === "lost") {
            setStatusMessage(
                "Better luck next time! You can win the next challenge!"
            );
        }
    });

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <p>{statusMessage}</p>

                <p className={styles.wordOfTheDay}>
                    Word of the Day: <span>{data.word}</span>
                </p>
                <p>
                    <strong>Definition:</strong> {data.definition}
                </p>
                {/* <p>
                    <strong>Synonyms:</strong> {data.synonyms.join(", ")}
                </p>
                <p>
                    <strong>Antonyms:</strong> {data.antonyms.join(", ")}
                </p>
                <div className={styles.examples}>
                    <strong>Examples:</strong>
                    {data.examples.map((example, index) => (
                        <span key={index}> {example}</span>
                    ))}
                </div> */}
                <p className={styles.prompt}>
                    Come back tomorrow for a new challenge!
                </p>

                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default GameOverModal;
