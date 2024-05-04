import { useState } from "react";

import LoginForm from "../../components/AuthenticationForms/LoginForm";
import SignUpForm from "../../components/AuthenticationForms/SignUpForm";

import styles from "./AuthPage.module.css";
import VocabManLogo from "../../assets/VocabManLogo.png";

const LOGIN = "log in";
const SIGNUP = "sign up";

const AuthToggle = ({
    authType,
    setAuthType,
}: {
    authType: string;
    setAuthType: React.Dispatch<React.SetStateAction<string>>;
}) => {
    const isLogin = authType === LOGIN;
    return (
        <p>
            {isLogin
                ? "Don't have an account yet?"
                : "Already have an account?"}
            <br />
            <span
                className={styles.authToggle}
                onClick={() => setAuthType(isLogin ? SIGNUP : LOGIN)}
            >
                {isLogin ? "Create an account" : "Log In"}
            </span>
            <div className={styles.orContainer}>
                <span className={styles.horizontalLine} /> or
                <span className={styles.horizontalLine} />
            </div>
            <span className={styles.guest}>continue as guest</span>
        </p>
    );
};

const AuthPage = () => {
    const [authType, setAuthType] = useState(LOGIN);

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <img src={VocabManLogo} alt="Logo" />
                <p className={styles.infoText}>
                    VocabMan <br /> Have fun, improve vocabulary!
                </p>
            </div>
            <div className={styles.right}>
                <div className={styles.formWrapper}>
                    {authType === LOGIN ? <LoginForm /> : <SignUpForm />}
                </div>
                <AuthToggle authType={authType} setAuthType={setAuthType} />
            </div>
        </div>
    );
};

export default AuthPage;
