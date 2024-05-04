import { useState } from "react";
import styles from "./Form.module.css";

const SignUpForm = () => {
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

        // try {
        //     const response = await axios.post(
        //         "http://your-backend-url/api/signup",
        //         formData
        //     );
        //     console.log("Server response:", response);
        //     // Redirect or show success message
        // } catch (error) {
        //     console.error("Signup error:", error);
        //     // Show error message
        // }
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
