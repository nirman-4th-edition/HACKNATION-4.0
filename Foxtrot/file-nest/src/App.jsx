// import ChatPanel from "./components/Chatting/ChatPanel";
// import SideBar from "./components/SideBar";
// import Storage from "./components/Storage";
// import AuthPage from "./AuthPage";
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import { useEffect, useState } from "react";

// function App() {
//   // const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // useEffect(() => {
//   //   const token = localStorage.getItem('authToken');
//   //   console.log(token);

//   //   setIsAuthenticated(token != null);
//   // }, []);

//   const isAuthenticated = localStorage.getItem("authToken")!=null;

//   return (
//     <Router>
//       <Routes>
//         <Route
//           path="/"
//           element={isAuthenticated ? (
//           <>
//             <div className="flex justify-around">
//               <SideBar />
//               <Storage />
//               <ChatPanel />
//             </div>
//           </>
//           ) : (
//             <Navigate to="/auth" />
//           )}
//         />

//         {/* Auth Route */}
//         <Route path="/auth" element={<AuthPage />} />

//       </Routes>
//     </Router>
//   );
// }

// export default App;
