import axios from "axios";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";
import { useUser } from "../contexts/UserContext";

import { endpoint } from "../main";

interface ILoginData {
    email: string;
    password: string;
}

export const useLogin = () => {
    const { login } = useAuth();
    const { setCurrentUser } = useUser();

    const navigate = useNavigate();

    return useMutation(
        async (credentials: ILoginData) => {
            const { data } = await axios.post(
                `${endpoint}/api/v1/auth/login`,
                credentials
            );
            return data;
        },
        {
            onSuccess: (data) => {
                setCurrentUser(data.user);
                login(data.token);
                navigate("/");
            },
            onError: (error) => {
                console.error("Login failed", error);
            },
        }
    );
};
