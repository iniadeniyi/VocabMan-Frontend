import styles from "./GameOverModal.module.css";

interface GameOverModalProps {
    data: {
        word: string;
        definition: {
            definition: string;
            partOfSpeech?: string;
        };
        antonyms: string[];
        synonyms: string[];
        examples: string[];
    };
    isOpen: boolean;
    onClose: () => void;
}

function GameOverModal({ data, isOpen, onClose }: GameOverModalProps) {
    if (!isOpen) return null;
    if (!data) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Game Over</h2>
                <p className={styles.wordOfTheDay}>
                    Word of the Day: <span>{data.word}</span>
                </p>
                <p>
                    <strong>Definition:</strong> {data.definition.definition}
                </p>
                <p>
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
                </div>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default GameOverModal;
