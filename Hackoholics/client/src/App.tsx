import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import Header from "./components/Header";
import { StudentDashboard } from "./pages/StudentDashboard";
import { UIProvider } from "./contexts/ui.context";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { Profile } from "./pages/Profile";
import LoadingScreen from "./pages/LoadingScreen";
import { AuthProvider, useAuth } from "./contexts/auth.context";
import ChatBot from "./pages/ChatBot";
import AdminDashboard from "./pages/AdminDashBoard";
// import { AdminDashboard } from "./pages/AdminDashboard";
import NotAuthorized from "./pages/NotAuthorized";
import { AllCandidate } from "./pages/admin/Candidates";
import { AllCompanies } from "./pages/admin/companies";
import Hrs from "./pages/admin/Hrs";
import ATS from "./pages/atsScore"; // Import the AtsScore component
import { HRDashboard } from "./pages/HrDashboard";
import { ShortListedCompanies } from "./pages/ShortListedCompanies";
import Feedbacks from "./pages/Feedbacks";
import Feedbackform from "./pages/Feedbackform";

function MainLayout() {
  const location = useLocation();
  const hideHeaderSidebarPaths = ["/login", "/signup"];
  const shouldShowHeaderSidebar = !hideHeaderSidebarPaths.includes(
    location.pathname
  );
  const { isAuthenticated, authLoading, user } = useAuth();

  // Global loading state
  if (authLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      {shouldShowHeaderSidebar && (
        <Header
          title={
            location.pathname === "/"
              ? "Dashboard"
              : location.pathname
                .substring(1)
                .replace(/(^|\s)\S/g, (t) => t.toUpperCase())
          }
        />
      )}
      <div
        className={`flex flex-1 ${!shouldShowHeaderSidebar || location.pathname === '/weekly-contest' || location.pathname === '/daily-contest' || location.pathname === '/contest-main'
          ? "pt-1" : "pt-15"}`}
      >
        {shouldShowHeaderSidebar && <Sidebar />}
        <main
          className={`flex-1 ${!shouldShowHeaderSidebar || location.pathname === "/chatbot" ? "bg-gray-50 p-0"
            : "p-6 md:p-8"
            }`}
        >
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  user?.role === "student" ? (
                    <StudentDashboard />
                  ) : user?.role === "admin" ? (
                    <AdminDashboard />
                  ) : (
                    <HRDashboard />
                  )
                ) : (
                  <Navigate to="/login" state={{ from: location }} replace />
                )
              }
            />
            <Route
              path="/login"
              element={
                isAuthenticated ? <Navigate to="/" replace /> : <Login />
              }
            />
            <Route
              path="/signup"
              element={
                isAuthenticated ? <Navigate to="/" replace /> : <SignUp />
              }
            />
            <Route
              path="/profile"
              element={
                isAuthenticated ? (
                  <Profile />
                ) : (
                  <Navigate to="/login" state={{ from: location }} replace />
                )
              }
            />
            <Route
              path="/companies"
              element={
                isAuthenticated ? (
                  <ShortListedCompanies />
                ) : (
                  <Navigate to="/login" state={{ from: location }} replace />
                )
              }
            />
            <Route
              path="/candidates"
              element={
                isAuthenticated ? (
                  <AllCandidate />
                ) : (
                  <Navigate to="/login" state={{ from: location }} replace />
                )
              }
            />
            <Route
              path="/ChatBot"
              element={
                isAuthenticated ? (
                  <ChatBot />
                ) : (
                  <Navigate to="/login" state={{ from: location }} replace />
                )
              }
            />
            <Route
              path="/feedbacks"
              element={
                isAuthenticated ? (
                  <Feedbacks />
                ) : (
                  <Navigate to="/login" state={{ from: location }} replace />
                )
              }
            />
            <Route
              path="/allcompanies"
              element={
                isAuthenticated ? (
                  user?.role !== "admin" ? (
                    <NotAuthorized />
                  ) : (
                    <AllCompanies />
                  )
                ) : (
                  <Navigate to="/login" state={{ from: location }} replace />
                )
              }
            />
            <Route
              path="/allcandidates"
              element={
                isAuthenticated ? (
                  user?.role !== "admin" ? (
                    <NotAuthorized />
                  ) : (
                    <AllCandidate />
                  )
                ) : (
                  <Navigate to="/login" state={{ from: location }} replace />
                )
              }
            />
            <Route
              path="/hrs"
              element={
                isAuthenticated ? (
                  user?.role !== "admin" ? (
                    <NotAuthorized />
                  ) : (
                    <Hrs />
                  )
                ) : (
                  <Navigate to="/login" state={{ from: location }} replace />
                )
              }
            />
            <Route path="/feedbackform" element={<Feedbackform />} />
            <Route
              path="/resume"
              element={
                isAuthenticated ? (
                  user?.role === "student" ? (
                    <>ResumeForm</>
                  ) : (
                    <NotAuthorized />
                  )
                ) : (
                  <Navigate to="/login" state={{ from: location }} replace />
                )
              }
            />
            <Route
              path="/atsChecker"
              element={
                isAuthenticated ? (
                  user?.role === "student" ? (
                    <ATS />
                  ) : (
                    <NotAuthorized />
                  )
                ) : (
                  <Navigate to="/login" state={{ from: location }} replace />
                )
              }
            />
            <Route
              path="/openSource"
              element={
                isAuthenticated ? (
                  user?.role === "student" ? (
                    <>OpenSource</>
                  ) : (
                    <NotAuthorized />
                  )
                ) : (
                  <Navigate to="/login" state={{ from: location }} replace />
                )
              }
            />
          </Routes>
        </main>
      </div>
    </>
  );
}

export function App() {
  return (
    <AuthProvider>
      <UIProvider>
        <BrowserRouter>
          <MainLayout />
        </BrowserRouter>
      </UIProvider>
    </AuthProvider>
  );
}

export default App;
