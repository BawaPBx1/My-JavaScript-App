import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import {Header, HeaderDark, Message, PageHeadings} from './components/'
import { Home, Company, Features, Marketplace, Product, Login, Register, PageNotFound, ForgotPassword } from './pages';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  const [count, setCount] = useState(0);
   const [data, setData] = useState(null);

  useEffect(() => {
    const fetchProtectedData = async () => {
      const token = localStorage.getItem("token");
      if(!token) return;

      try {
        const response = await fetch("/api/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();

        // if (!response.ok) {
        //   toast.error(result.message || "Unauthorized");
        //   return;
        // }
        // console.log("checking the result for jwt : ", result)
        if (result?.message?.toLowerCase().includes("jwt expired") || result?.message?.toLowerCase().includes("expired token")) {
          // console.warn("⏰ Token expired. Clearing from storage...");
          localStorage.removeItem("token");
          // localStorage.removeItem("user");
          toast.error("Session expired. Please log in again.");
          // Optional: redirect to login
          // navigate("/login");
        } else {
          toast.success(result.message || "Unauthorized");
        }

        setData(result);
      } catch (err) {
        // console.error("Error fetching protected data:", err.message);
        toast.error("Something went wrong.");
      }
    };

    fetchProtectedData();
  }, []);


  return (
    <>
      <Header />
      {/* <Message /> */}
      {/* <PageHeadings pageHeading="Home Page" /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/company" element={<Company />} />
        <Route path="/features" element={<Features />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/product" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/api/message" element={<Home />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <ToastContainer position="bottom-right"/>
    </>
  )
}

export default App
