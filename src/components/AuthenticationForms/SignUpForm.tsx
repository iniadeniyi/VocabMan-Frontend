import React, { useState } from "react";
import { useSignUp } from "../../hooks/useSignUp";
import styles from "./Form.module.css";
import { AxiosError } from "axios";

const SignUpForm = () => {
    const { mutate: signUp, isLoading, error: signUpError } = useSignUp();
    console.log(signUpError);

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState<any>({
        username: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        if (errors[name]) {
            setErrors((prevErrors: any) => ({
                ...prevErrors,
                [name]: "",
            }));
        }
    };

    const validUsername = (username: string) =>
        /^[a-zA-Z0-9]{6,8}$/.test(username);

    const validPassword = (password: string) => {
        return password.length >= 8;
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let hasError = false;

        if (!validUsername(formData.username)) {
            setErrors((prevErrors: any) => ({
                ...prevErrors,
                username:
                    "Username must be 6-8 characters long and alphanumeric.",
            }));
            hasError = true;
        }
        if (!validPassword(formData.password)) {
            setErrors((prevErrors: any) => ({
                ...prevErrors,
                password: "Password must be at least 8 characters long.",
            }));
            hasError = true;
        }
        if (formData.password !== formData.confirmPassword) {
            setErrors((prevErrors: any) => ({
                ...prevErrors,
                confirmPassword: "Passwords don't match.",
            }));
            hasError = true;
        }

        if (!hasError) {
            const { confirmPassword, ...dataToSend } = formData;
            signUp(dataToSend);
        }
    };

    return (
        <div className={styles.loginCard}>
            <div className={styles.header}>Welcome to VocabMan</div>
            <form className={styles.form} onSubmit={handleSubmit}>
                {signUpError && (
                    <div className={styles.error}>
                        {(signUpError as AxiosError<any>).response?.data}
                    </div>
                )}
                <input
                    type="username"
                    name="username"
                    autoComplete="off"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                {errors.username && (
                    <div className={styles.error}>{errors.username}</div>
                )}
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
                {errors.password && (
                    <div className={styles.error}>{errors.password}</div>
                )}
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    autoComplete="new-password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />
                {errors.confirmPassword && (
                    <div className={styles.error}>{errors.confirmPassword}</div>
                )}
                <button type="submit" disabled={isLoading}>
                    REGISTER
                </button>
            </form>
        </div>
    );
};

export default SignUpForm;
