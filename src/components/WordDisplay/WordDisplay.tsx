import LetterCard from "../LetterCard/LetterCard";

import styles from "./WordDisplay.module.css";

interface WordDiplayProps {
    word: string;
    guessedLetters: string[];
}
function WordDisplay({ word, guessedLetters }: WordDiplayProps) {
    const letters = word.split("");

    return (
        <div className={styles.wordDisplayWrapper}>
            {letters.map((letter, idx) => (
                <LetterCard
                    key={idx}
                    letter={letter}
                    isGuessed={guessedLetters.includes(letter)}
                />
            ))}
        </div>
    );
}

export default WordDisplay;
