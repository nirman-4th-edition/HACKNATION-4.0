import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { getRequest } from "../utils/services";
import { Company, CompanyData } from "../types";
import { useAuth } from "./auth.context";
import { jwtDecode } from "jwt-decode";

const BASE_URL = "http://localhost:3030/api/studentSelection";
const ADMIN_BASE_URL = "http://localhost:3030/api/details";

const CompanyContext = createContext<CompanyContextProps | undefined>(
  undefined
);

export const CompanyProvider = ({ children }: { children: ReactNode }) => {
  const [companies, setCompanies] = useState<Company[] | CompanyData[]>([]);
  const token = localStorage.getItem("token");
  const { user,isAuthenticated } = useAuth();

  const getCompanies = useCallback(async () => {
    const response = await getRequest(`${BASE_URL}/companies`, token);
    if (response.success) {
      setCompanies(response.data.companies);
    } else {
      console.error(response.error);
    }
  }, []);

  const getAllCompanies = useCallback(async () => {
    const response = await getRequest(`${ADMIN_BASE_URL}/companies`, token);
    console.log("getAllCompanies response: ", response);
    if (response.success) {
      setCompanies(response.data.companies);
    } else {
      console.error(response.error);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setCompanies([]);
      return;
    }
    const decoded: any = jwtDecode(token);
    if (decoded.role === "admin") {
      getAllCompanies();
    } else if (decoded.role === "student") {
      getCompanies();
    } else {
      setCompanies([]);
      return;
    }
  }, [getCompanies, getAllCompanies, user, isAuthenticated]);

  return (
    <CompanyContext.Provider value={{ companies, getCompanies, getAllCompanies }}>
      {children}
    </CompanyContext.Provider>
  );
};

export interface CompanyContextProps {
  companies: Company[] | CompanyData[];
  getCompanies: () => void;
  getAllCompanies: () => void;
}

export const useCompany = () => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error("useCompany must be used within a CompanyProvider");
  }
  return context;
};

export default CompanyContext;
