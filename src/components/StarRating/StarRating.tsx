import { useGameContext } from "../../contexts/GameContext";
import styles from "./StarRating.module.css";
import { FaStar, FaRegStar } from "react-icons/fa";

const StarRating = () => {
    const { gameState } = useGameContext();
    const totalStars = 5;
    const fillPercentage = `${(gameState.rating / totalStars) * 100}%`;

    return (
        <div className={styles.starRating}>
            <div className={styles.starsBackground}>
                {Array.from({ length: totalStars }, (_, index) => (
                    <FaRegStar key={index} className={styles.star} />
                ))}
            </div>
            <div
                className={styles.starsForeground}
                style={{ width: fillPercentage }}
            >
                {Array.from({ length: totalStars }, (_, index) => (
                    <FaStar key={index} className={styles.star} />
                ))}
            </div>
        </div>
    );
};

export default StarRating;
