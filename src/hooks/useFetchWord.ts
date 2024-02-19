import { useQuery } from "react-query";

const fetchWord = async () => {
    const response = await fetch(
        "https://vocabman-backend.onrender.com/api/word-of-the-day"
    );
    console.log(response);
    if (!response.ok) {
        console.log("error");

        throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log(data);
    return data;
};

export const useFetchWord = () => {
    return useQuery("fetchWord", fetchWord);
};
