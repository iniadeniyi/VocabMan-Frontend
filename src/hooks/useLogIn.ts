import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

interface ILoginData {
    email: string;
    password: string;
}

export const useLogin = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation(
        async (credentials: ILoginData) => {
            const { data } = await axios.post(
                "https://localhost:3000/api/v1/auth/login",
                credentials
            );
            return data;
        },
        {
            onSuccess: (data) => {
                console.log("log in successful", data);
                localStorage.setItem("token", data.token);
                queryClient.setQueryData("user", data.user);
                navigate("/");
            },
            onError: (error) => {
                console.error("Login failed", error);
            },
        }
    );
};
