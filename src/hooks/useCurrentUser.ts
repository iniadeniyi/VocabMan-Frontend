import { useQuery } from "react-query";
import axios from "axios";

import { endpoint } from "../main";

const fetchUser = async () => {
    const response = await axios.get(`${endpoint}/api/v1/user/current`);
    return response.data;
};

const useCurrentUser = () => {
    return useQuery("currentUser", fetchUser, {
        onError: (error) => {
            console.error("Error fetching current user:", error);
        },
    });
};

export default useCurrentUser;
