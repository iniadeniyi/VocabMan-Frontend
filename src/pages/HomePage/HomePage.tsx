import { useState } from "react";

import GameWindow from "../../components/GameWindow/GameWindow";
import SidePanel from "../../components/SidePanel/SidePanel";

import styles from "./HomePage.module.css";

function HomePage() {
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    const togglePanel = () => {
        setIsPanelOpen(!isPanelOpen);
    };

    return (
        <div className={styles.container}>
            <button className={styles.hamburger} onClick={togglePanel}>
                &#9776;
            </button>

            <div
                className={
                    isPanelOpen ? styles.sidePanelOpen : styles.sidePanel
                }
            >
                <SidePanel />
            </div>
            <div className={styles.gameWindow}>
                <GameWindow />
            </div>
        </div>
    );
}

export default HomePage;
