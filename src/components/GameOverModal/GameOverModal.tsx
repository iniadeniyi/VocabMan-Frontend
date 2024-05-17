import { useEffect, useState } from "react";

import { useGameContext } from "../../contexts/GameContext";

// import StarRating from "../StarRating/StarRating";

import styles from "./GameOverModal.module.css";

interface GameOverModalProps {
    isOpen: boolean;
    onClose: () => void;
}

function GameOverModal({ isOpen, onClose }: GameOverModalProps) {
    const { gameState, word } = useGameContext();

    const [statusMessage, setStatusMessage] = useState("");

    useEffect(() => {
        if (gameState.status === "won") {
            setStatusMessage("🎉 You've won today's challenge!");
        } else if (gameState.status === "lost") {
            setStatusMessage(
                "😔 Better luck next time! You can win tomorrow's challenge!"
            );
        }
    }, [gameState.status]);

    if (!isOpen || !word) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <p>{statusMessage}</p>
                {/* <StarRating /> */}
                <h4>{gameState.rating}/5 stars</h4>

                <p>
                    <span className={styles.wordOfTheDay}>
                        <a
                            href={`https://www.merriam-webster.com/dictionary/${word.word}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {word.word}
                        </a>
                    </span>
                </p>
                <p>
                    Definition: <strong>{word.definition}</strong>
                </p>

                <p className={styles.prompt}>
                    Come back tomorrow for a new challenge!
                </p>

                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default GameOverModal;
