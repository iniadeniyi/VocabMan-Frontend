import axios from "axios";
import { useMutation } from "react-query";

import { useAuthContext } from "../contexts/AuthContext";

import { endpoint } from "../main";

interface IPerformance {
    challengeId: string;
    rating: number;
}

export const useLogActivity = () => {
    const { updateCurrentUser } = useAuthContext();

    return useMutation(
        async (performance: IPerformance) => {
            const { data } = await axios.post(
                `${endpoint}/api/v1/activity/`,
                performance
            );
            return data;
        },
        {
            onSuccess: (data) => {
                console.log(data);
                updateCurrentUser(data);
            },
            onError: (error) => {
                console.error("Activity log failed", error);
            },
        }
    );
};
