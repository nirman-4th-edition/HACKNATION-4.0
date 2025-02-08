import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Contest, Result } from "../types";
import { getRequest } from "../utils/services";
import { useAuth } from "./auth.context";

interface ContestContextProps {
    contests: Contest[];
    getContests: () => Promise<void>;
}

const BASE_URL = "http://localhost:3030/api/contest/";

const ContestContext = createContext<ContestContextProps | undefined>(
  undefined
);

export const ContestProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [contests, setContests] = useState<Contest[]>([]);

    const getContests = useCallback(async () => {
        const token = localStorage.getItem("token");
        const response = await getRequest(`${BASE_URL}`, token);
        console.log("token: ", token);
        console.log("response: ", response);
        if (response.success) {
            setContests(response.data); 
        } else {
            console.error(response.error);
        }
    }, []);

  return (
    <ContestContext.Provider value={{
        contests,
        getContests,
    }}>{children}</ContestContext.Provider>
  );
};

export const useContest = () => {
    const context = useContext(ContestContext);
    if (!context) {
        throw new Error("useContest must be used within a CompanyProvider");
    }
    return context;
};