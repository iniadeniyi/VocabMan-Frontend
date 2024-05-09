import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { endpoint } from "../main";

interface ISignUpData {
    username: string;
    email: string;
    password: string;
}

export const useSignUp = () => {
    const { login } = useAuth();
    const { setCurrentUser } = useUser();
    const navigate = useNavigate();

    return useMutation(
        async (userData: ISignUpData) => {
            const { data } = await axios.post(
                `${endpoint}/api/v1/auth/register`,
                userData
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
                console.error("Sign up failed", error);
            },
        }
    );
};
