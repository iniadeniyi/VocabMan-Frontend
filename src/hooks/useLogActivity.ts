import axios from "axios";
import { useMutation } from "react-query";

import { endpoint } from "../main";

interface IPerformance {
    challengeId: string;
    stars: number;
}

export const useLogActivity = () => {
    const token = localStorage.getItem("token");
    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };

    return useMutation(
        async (performance: IPerformance) => {
            const { data } = await axios.post(
                `${endpoint}/api/v1/activity/`,
                performance,
                { headers }
            );
            return data;
        },
        {
            onSuccess: (data) => {
                console.log(data);
            },
            onError: (error) => {
                console.error("Activity log failed", error);
            },
        }
    );
};
