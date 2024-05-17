import React, { useState } from "react";

import LoginForm from "../../components/AuthenticationForms/LoginForm";
import SignUpForm from "../../components/AuthenticationForms/SignUpForm";
import AuthToggle from "./AuthToggle";

import styles from "./AuthPage.module.css";

import VocabManLogo from "../../assets/VocabManLogo.png";

const AuthPage: React.FC = () => {
    const [authType, setAuthType] = useState("log in");

    const renderForm = () => {
        switch (authType) {
            case "log in":
                return <LoginForm />;
            case "sign up":
                return <SignUpForm />;
            default:
                return <div>Invalid auth type</div>;
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <img
                    src={VocabManLogo}
                    alt="VocabMan Logo"
                    className={styles.logo}
                />
                <p className={styles.slogan}>
                    VocabMan <br /> Have fun, improve vocabulary!
                </p>
            </div>
            <div className={styles.right}>
                <div className={styles.formWrapper}>{renderForm()}</div>
                <AuthToggle authType={authType} setAuthType={setAuthType} />
            </div>
        </div>
    );
};

export default AuthPage;
