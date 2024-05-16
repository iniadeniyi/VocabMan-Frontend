import { useGameContext } from "../../contexts/GameContext";

import { BsStar, BsStarHalf, BsStarFill } from "react-icons/bs";

import styles from "./StarRating.module.css";

function StarRating() {
    const { gameState } = useGameContext();

    const stars = gameState.remainingAttempts / 2;
    const total = 3;

    const fullStars = Math.floor(stars);
    const halfStar = stars % 1 >= 0.5 ? 1 : 0;
    const emptyStars = total - fullStars - halfStar;

    return (
        <div className={styles.starRating}>
            {Array(fullStars)
                .fill(0)
                .map((_, index) => (
                    <BsStarFill
                        key={`full-${index}`}
                        className={styles.filled}
                    />
                ))}
            {halfStar > 0 && (
                <BsStarHalf key="half-1" className={styles.halfFilled} />
            )}
            {Array(emptyStars)
                .fill(0)
                .map((_, index) => (
                    <BsStar key={`empty-${index}`} className={styles.star} />
                ))}
        </div>
    );
}

export default StarRating;
