import { format } from "date-fns";

import { useAuth } from "../../contexts/AuthContext";

import styles from "./SidePanel.module.css";

import VocabManLogo from "../../assets/VocabManLogo.png";
import { useUser } from "../../contexts/UserContext";

const SidePanel = () => {
    const { logout } = useAuth();
    const { currentUser } = useUser();

    const menuItems: any = [];

    return (
        <div className={styles.sidePanel}>
            <div className={styles.appInfo}>
                <img className={styles.logo} src={VocabManLogo} alt="Logo" />
                <h2 className={styles.appName}>VocabMan</h2>
            </div>

            <div className={styles.separator}></div>

            <div className={styles.userInfo}>
                <p>{currentUser?.username}</p>
                <p>current streak: {currentUser?.currentStreak}</p>
                <p>longest streak: {currentUser?.longestStreak}</p>
                <p>joined on: {currentUser?.createdAt}</p>
            </div>

            <div className={styles.separator}></div>

            <p>activity log</p>

            <div className={styles.separator}></div>

            {/* {menuItems.map((item: any, index: number) => (
                <div key={index} className="menu-item">
                    <span className="icon">{item.icon}</span>
                    <span className="text">{item.text}</span>
                </div>
            ))} */}

            <p className={styles.logout} onClick={() => logout()}>
                log out
            </p>
        </div>
    );
};

export default SidePanel;
