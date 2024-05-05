import { useState } from "react";

import { useSignUp } from "../../hooks/useSignUp";

import styles from "./Form.module.css";

const SignUpForm = () => {
    const { mutate: signUp, isLoading, error } = useSignUp();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (event: { target: { name: any; value: any } }) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords don't match.");
            return;
        }

        const { confirmPassword, ...dataToSend } = formData;
        signUp(dataToSend);
    };

    return (
        <div className={styles.loginCard}>
            <div className={styles.header}>Welcome to VocabMan</div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    type="username"
                    name="username"
                    autoComplete="off"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    autoComplete="off"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    autoComplete="new-password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    autoComplete="new-password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />
                <button type="submit">REGISTER</button>
            </form>
        </div>
    );
};

export default SignUpForm;
