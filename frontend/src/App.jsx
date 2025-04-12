import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import SettingPage from "./pages/SettingPage";
import Profile from "./pages/Profile";
import { useAuthStore } from "./store/useAuthstore";
import {Loader} from 'lucide-react'
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth,onlineUsers } = useAuthStore();
  const {theme} = useThemeStore()


  useEffect(() => {
    checkAuth();
  }, [checkAuth]);


  if(isCheckingAuth && !authUser) {
    return <div className="w-full h-screen flex items-center justify-center">
      <Loader className="animate-spin text-white size-10" size={40} />
    </div>;
  }

  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ?  <HomePage /> : <Navigate to='/login' />} />
        <Route path="/signup" element={!authUser ?  <SignupPage /> : <Navigate to='/'/>} />
        <Route path="/login" element={!authUser ?  <SigninPage /> : <Navigate to='/'/>} />
        <Route path="/setting" element={ <SettingPage />} />
        <Route path="/profile" element={authUser ? <Profile /> : <Navigate to='/login'/>} />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
