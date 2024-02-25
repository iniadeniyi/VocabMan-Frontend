import { useEffect, useState } from "react";
import styles from "./LetterCard.module.css";

interface LetterCardProps {
    letter: string;
    isGuessed: boolean;
}

function LetterCard({ letter, isGuessed }: LetterCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
        if (isGuessed) {
            setIsFlipped(true);
        }
    }, [isGuessed]);

    return (
        <div className={styles.cardContainer}>
            <div
                className={`${styles.card} ${!isFlipped ? styles.flipped : ""}`}
            >
                <div className={styles.front}>
                    <strong>{letter}</strong>
                </div>
                <div className={styles.back}></div>
            </div>
        </div>
    );
}

export default LetterCard;
