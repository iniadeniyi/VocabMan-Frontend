import { ReactNode, createContext, useContext, useState } from "react";

type User = {
    username: string;
    currentStreak: number;
    longestStreak: number;
    createdAt: string;
};

interface IUserContext {
    currentUser: User;
    setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
}

const UserContext = createContext<IUserContext>({} as IUserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<User>({} as User);

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
