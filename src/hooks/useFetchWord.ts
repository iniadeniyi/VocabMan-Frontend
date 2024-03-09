import { useQuery } from "react-query";
import { doc, getDoc } from "firebase/firestore";
import { format } from "date-fns";

import { firestore } from "../config/firebaseConfig.ts";

export interface WordData {
    word: string;
    definition: string;
    // definition: {
    //     definition: string;
    //     partOfSpeech?: string;
    // };
    // antonyms: string[];
    // synonyms: string[];
    // examples: string[];
}

const fetchWordFromFirestore = async (): Promise<WordData> => {
    const todayFormatted = format(new Date(), "yyyy-MM-dd");
    const docRef = doc(firestore, "words", todayFormatted);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data() as WordData;
    } else {
        throw new Error("No word found for today.");
    }
};

export const useFetchWord = () => {
    return useQuery("fetchWord", fetchWordFromFirestore);
};
