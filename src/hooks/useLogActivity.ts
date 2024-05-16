import axios from "axios";
import { useMutation } from "react-query";

import { endpoint } from "../main";

interface IPerformance {
    challengeId: string;
    stars: number;
}

export const useLogActivity = () => {
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
            },
            onError: (error) => {
                console.error("Activity log failed", error);
            },
        }
    );
};
