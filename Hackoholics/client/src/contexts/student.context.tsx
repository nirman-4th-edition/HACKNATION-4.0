import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { getRequest } from "../utils/services";
import { Student, StudentData } from "../types";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "./auth.context";
const BASE_URL = "http://localhost:3030/api/studentSelection";
const ADMIN_BASE_URL = "http://localhost:3030/api/details";
const StudentContext = createContext<StudentContextProps | undefined>(
  undefined
);
export const StudentProvider = ({ children }: { children: ReactNode }) => {
  const [students, setStudents] = useState<Student[] | StudentData[]>([]);
  const { user } = useAuth();
  const token = localStorage.getItem("token");
  const getStudents = useCallback(async () => {
    const response = await getRequest(`${BASE_URL}/students`, token);
    if (response.success) {
      const student = Array.isArray(response.data.shortlistedStudents)
        ? response.data.shortlistedStudents.map((student: any) => {
            return {
              id: student._id,
              name: student.name,
              branch: student.branch,
              admissionYear: student.admissionYear,
              status: response.data.selectedStudents.some(
                (s: any) => s._id === student._id
              )
                ? "Selected"
                : response.data.completedStudents.some(
                    (s: any) => s._id === student._id
                  )
                ? "Done"
                : "Pending",
            };
          })
        : [];
      console.log(student);
      setStudents(student);
    }
  }, [token]);

  const getAllStudents = useCallback(async () => {
    const response = await getRequest(`${ADMIN_BASE_URL}/students`, token);
    if (response.success) {
      console.log(response.data.studentsData);
      const student = Array.isArray(response.data.studentsData)
      ? response.data.studentsData.map((student: any) => {
        
        console.log("shcvshcvsdh", student);
            return {
              _id: student._id,
              name: student.name,
              section: student.section,
              branch: student.branch,
              admissionYear: student.admissionYear,
              feedback: student.feedback,
              companies: student.companies,
              placedAt: student.placedAt,
              email: student.email,
              status: student.placedAt.length>0 ? "Placed" : student.completedCompanies.length > 0 ? "Done" : "Pending",
            };
          })
        : [];
      console.log(student);
      setStudents(student);
    }
  }, [token]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decode = jwtDecode(token);
      if (decode && (decode as any)?.role === "hr") {
        getStudents();
      } else if (decode && (decode as any)?.role === "admin") {
        getAllStudents();
      } else {
        setStudents([]);
        return;
      }
    } else {
      setStudents([]);
      return;
    }
  }, [getStudents, getAllStudents, user]);
  return (
    <StudentContext.Provider value={{ students, getStudents, getAllStudents }}>
      {children}
    </StudentContext.Provider>
  );
};

export interface StudentContextProps {
  students: Student[] | StudentData[];
  getStudents: () => void;
  getAllStudents: () => void;
}

export const useStudent = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error("useStudent must be used within a StudentProvider");
  }
  return context;
};
