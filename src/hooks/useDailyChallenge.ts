import { useQuery } from "react-query";
import axios from "axios";

import { endpoint } from "../main";
import { QueryFunctionContext } from "react-query";

const fetchDailyChallenge = async ({ queryKey }: QueryFunctionContext) => {
    const [, date] = queryKey as [string, string];

    const response = await axios.get(`${endpoint}/api/v1/challenge/${date}`);
    return response.data;
};

export const useDailyChallenge = (date: string) => {
    return useQuery(["dailyChallenge", date], fetchDailyChallenge, {
        onError: (error) => {
            console.error("Error fetching daily challenge:", error);
        },
    });
};
