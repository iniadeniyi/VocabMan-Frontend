import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";

function HomePage() {
    const navigate = useNavigate();

    const handlePlayClick = () => {
        navigate("/play");
    };

    return (
        <div className={styles.container}>
            <div>LOGO</div>
            <h1>VocabMan</h1>
            <h2>Learn new a new word a day, while you have fun!</h2>
            <button className={styles.button} onClick={handlePlayClick}>
                Play
            </button>
        </div>
    );
}

export default HomePage;
