import React from "react";
import styles from "./AuthPage.module.css";

const LOGIN = "log in";
const SIGNUP = "sign up";

interface AuthToggleProps {
    authType: string;
    setAuthType: React.Dispatch<React.SetStateAction<string>>;
}

const AuthToggle: React.FC<AuthToggleProps> = ({ authType, setAuthType }) => {
    const isLogin = authType === LOGIN;
    const toggleText = isLogin ? "Register" : "Log In";
    const infoText = isLogin
        ? "Don't have an account yet?"
        : "Already have an account?";

    const handleToggle = () => setAuthType(isLogin ? SIGNUP : LOGIN);

    return (
        <div>
            <p>
                {infoText}{" "}
                <span
                    className={styles.authToggle}
                    onClick={handleToggle}
                    aria-label={toggleText}
                >
                    {toggleText}
                </span>
            </p>
            <div className={styles.orContainer}>
                <hr className={styles.horizontalLine} /> or
                <hr className={styles.horizontalLine} />
            </div>
            {/* <p onClick={() => setAuthType("guest")}>Continue as guest</p> */}
        </div>
    );
};

export default AuthToggle;
