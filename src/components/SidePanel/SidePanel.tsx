import { useAuthContext } from "../../contexts/AuthContext";

import styles from "./SidePanel.module.css";

import VocabManLogo from "../../assets/VocabManLogo.png";

const SidePanel = () => {
    const { user, logOut } = useAuthContext();

    return (
        <div className={styles.sidePanel}>
            <div className={styles.appInfo}>
                <img className={styles.logo} src={VocabManLogo} alt="Logo" />
                <h2 className={styles.appName}>VocabMan</h2>
            </div>

            <div className={styles.separator}></div>

            <div className={styles.userInfo}>
                <p>username: {user?.username}</p>
                <p>current streak: {user?.currentStreak} </p>
                <p>longest streak: {user?.longestStreak} </p>
                <p>joined on: {user?.createdAt}</p>
            </div>

            <div className={styles.separator}></div>

            <p className={styles.logout} onClick={() => logOut()}>
                log out
            </p>
        </div>
    );
};

export default SidePanel;
