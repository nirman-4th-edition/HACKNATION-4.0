import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import FarmerSignUp from "./pages/FSignUP";
import ProfileSetup from "./pages/profilesetup";
import Home from "./pages/Home";
import Dashboard from "./pages/dashboard";
import AboutUs from "./pages/about";
import ContactUs from "./pages/contactUs" ; 
import BuyerLogin from "./pages/blogin" ; 
import FeedbackForm from "./pages/feedback";
import SellerLogin from "./pages/slogin";
import BuyerProfile from "./pages/profilwb";
import BuyerSignup from "./pages/BSignUp";
import ProductListing from "./pages/pListing";
import ProductDetails from "./pages/pDetails";
import EditProfile from "./pages/editProfile";

const queryClient = new QueryClient();

const App = () => {
  // Get the current pathname
  const currentPath = window.location.pathname;

  // Define routes where the navbar should be hidden
  const hideNavbarRoutes = ["/buyersignup", "/farmersignup", "/profilesetup", "/"];

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {/* Show Navbar only if the current path is not in hideNavbarRoutes */}
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/fsignup" element={<FarmerSignUp />} />
            <Route path="/profilesetup" element={<ProfileSetup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/bsignup" element={<BuyerSignup/>} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/feedback" element={<FeedbackForm />} />
            <Route path="/blogin" element={<BuyerLogin />} />
            <Route path="/bprofile" element={<BuyerProfile />} />
            <Route path="/slogin" element={<SellerLogin />} />
            {/* <Route path="/bprofile" element={<BuyerProfile />} /> */}
            <Route path="/editProfile" element={<EditProfile />} />
            <Route path="/pListing" element={<ProductListing />} />
            <Route path="/pDetails" element={<ProductDetails />} />


            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
