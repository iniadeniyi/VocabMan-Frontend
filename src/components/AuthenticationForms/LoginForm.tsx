import { useState } from "react";

import { useLogin } from "../../hooks/useLogIn";

import styles from "./Form.module.css";

const LoginForm = () => {
    const { mutate: login } = useLogin();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const { ...dataToSend } = formData;
        login(dataToSend);
    };

    return (
        <div className={styles.loginCard}>
            <div className={styles.header}>Welcome Back to VocabMan</div>
            <form className={styles.form} onSubmit={handleSubmit}>
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
                <button type="submit">LOG IN</button>
            </form>
        </div>
    );
};

export default LoginForm;
