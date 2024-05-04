import { useState } from "react";
import styles from "./Form.module.css";

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (event: { target: { name: any; value: any } }) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div className={styles.loginCard}>
            <div className={styles.header}>Welcome Back to VocabMan</div>
            <form className={styles.form}>
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
