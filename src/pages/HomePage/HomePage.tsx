import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";

function HomePage() {
    const navigate = useNavigate();

    const handlePlayClick = () => {
        navigate("/play");
    };

    return (
        <div className={styles.container}>
            <h1>VocabMan</h1>
            <h2>Learn a new word everyday, while you have fun!</h2>
            <button className={styles.button} onClick={handlePlayClick}>
                <strong>PLAY</strong>
            </button>
        </div>
    );
}

export default HomePage;
