import { useQuery } from "react-query";
import axios from "axios";

import { endpoint } from "../main";

const fetchUser = async () => {
    const token = localStorage.getItem("token");
    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };

    const response = await axios.get(`${endpoint}/api/v1/user/current`, {
        headers,
    });

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
