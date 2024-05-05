import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

interface ISignUpData {
    username: string;
    email: string;
    password: string;
}

export const useSignUp = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation(
        async (userData: ISignUpData) => {
            const { data } = await axios.post(
                "http://localhost:3000/api/v1/auth/register",
                userData
            );
            return data;
        },
        {
            onSuccess: (data) => {
                console.log("Sign up successful", data);
                queryClient.setQueryData("user", data.user);
                login(data.token);
                navigate("/");
            },
            onError: (error) => {
                console.error("Sign up failed", error);
            },
        }
    );
};