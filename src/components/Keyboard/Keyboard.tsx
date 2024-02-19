import styles from "./Keyboard.module.css";

interface KeyboardProps {
    handleClick: any;
    guessedLetters: string[];
    isDisabled: boolean;
}
function Keyboard({ handleClick, guessedLetters, isDisabled }: KeyboardProps) {
    const keys = [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
        ["Z", "X", "C", "V", "B", "N", "M"],
    ];

    return (
        <div className={styles.keyboardWrapper}>
            {keys.map((row, rowIdx) => (
                <div key={rowIdx} className={styles.keysRow}>
                    {row.map((key) => (
                        <button
                            key={key}
                            className={styles.key}
                            onClick={() => handleClick(key)}
                            disabled={
                                isDisabled || guessedLetters.includes(key)
                            }
                        >
                            {key}
                        </button>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Keyboard;
