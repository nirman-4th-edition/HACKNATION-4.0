import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { getRequest } from "../utils/services";
import { Hr } from "../types";
import { useAuth } from "./auth.context";
import { jwtDecode } from "jwt-decode";

const ADMIN_BASE_URL = "http://localhost:3030/api/details";


const HrContext = createContext<HrContextProps | undefined>(undefined);

export interface HrContextProps {
  hrmembers: Hr[];
  getHrMembers: () => Promise<void>;
}

export const HrProvider = ({ children }: { children: ReactNode }) => {
  const [hrmembers, setHrMembers] = useState<Hr[]>([]);
  const token = localStorage.getItem("token");
  const { user, isAuthenticated } = useAuth();

  const getHrMembers = useCallback(async () => {
    const response = await getRequest(`${ADMIN_BASE_URL}/hrs`, token);
    if (response.success) {
        console.log("getHrMembers response: ", response);
      setHrMembers(response.data.hrsData);
    } else {
      console.error(response.error);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setHrMembers([]);
      return;
    }
    const decoded: any = jwtDecode(token);
    if (decoded.role === "admin") {
      getHrMembers();
    } else {
      setHrMembers([]);
      return;
    }
  }, [getHrMembers, user, isAuthenticated]);

  return (
    <HrContext.Provider value={{ hrmembers, getHrMembers }}>
      {children}
    </HrContext.Provider>
  );
};

export const useHr = () => {
  const context = useContext(HrContext);
  if (!context) {
    throw new Error("useHr must be used within a HrProvider");
  }
  return context;
};
