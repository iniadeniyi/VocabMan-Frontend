import axios from "axios";
import { UseMutationResult, useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../contexts/AuthContext";

import { endpoint } from "../main";
import { IAuthResponse } from "../types";

interface ILoginData {
    email: string;
    password: string;
}

export const useLogin = (): UseMutationResult<
    IAuthResponse,
    Error,
    ILoginData
> => {
    const { logIn } = useAuthContext();
    const navigate = useNavigate();

    return useMutation<IAuthResponse, Error, ILoginData>(
        async (credentials: ILoginData) => {
            const { data } = await axios.post(
                `${endpoint}/api/v1/auth/login`,
                credentials
            );
            return data;
        },
        {
            onSuccess: (data: IAuthResponse) => {
                logIn(data.token, data.user);
                navigate("/");
            },
            onError: (error) => {
                console.error("Login failed", error);
            },
        }
    );
};
