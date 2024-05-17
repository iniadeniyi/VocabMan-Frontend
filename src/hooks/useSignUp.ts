import axios from "axios";
import { useMutation, UseMutationResult } from "react-query";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../contexts/AuthContext";

import { endpoint } from "../main";
import { IAuthResponse } from "../types";

interface ISignUpData {
    username: string;
    email: string;
    password: string;
}

export const useSignUp = (): UseMutationResult<
    IAuthResponse,
    Error,
    ISignUpData
> => {
    const navigate = useNavigate();
    const { logIn } = useAuthContext();

    return useMutation<IAuthResponse, Error, ISignUpData>(
        async (userData: ISignUpData) => {
            const { data } = await axios.post<IAuthResponse>(
                `${endpoint}/api/v1/auth/register`,
                userData
            );
            return data;
        },
        {
            onSuccess: (data: IAuthResponse) => {
                localStorage.removeItem("gameState");
                logIn(data.token, data.user);
                navigate("/");
            },
            onError: (error: any) => {
                console.error("Sign up failed", error);
            },
        }
    );
};
