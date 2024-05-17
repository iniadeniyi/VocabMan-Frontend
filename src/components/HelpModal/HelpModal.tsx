import styles from "./HelpModal.module.css";

const HelpModal = ({ onClose }: { onClose: any }) => {
    return (
        <div className={styles.modalBackground}>
            <div className={styles.modalContent}>
                <h2>Welcome to Word Game!</h2>
                <p>
                    This game challenges you to guess a word by typing letters.
                    Here's how to play:
                </p>
                <ul>
                    <li>
                        Type a letter or click on the on-screen keyboard to
                        guess the word.
                    </li>
                    <li>
                        If the letter is in the word, it will appear in its
                        correct position.
                    </li>
                    <li>
                        You have a limited number of attempts to guess the word
                        correctly.
                    </li>
                </ul>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default HelpModal;
