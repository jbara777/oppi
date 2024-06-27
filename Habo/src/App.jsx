import React from 'react';
import Home from "./pages/Home/Home";
import Profile from './pages/Profile/Profile';
import LeaveReq from './pages/LeaveReq/LeaveReq';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Menu from './components/menu/Menu';
import LoginPage from './pages/Login/LoginPage';
import AttendanceHistory from  "./pages/AttendanceHistory/AttendanceHistory";
import "./styles/global.scss";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Outlet
} from "react-router-dom";



function App() {

  const Layout = () => {
    return (
      <div className="main">
        <Navbar />
          <div className="container">
            <div className="menuContainer">
              <Menu />
            </div>
            <div className="contentContainer">
              <Outlet />
            </div>
          </div>
        <Footer />
      </div>
    )
  }


  const router = createBrowserRouter([
    {
      path: "/login",
      element:  <LoginPage />
    },
    {
       path: "/",
       element : <Layout />,
       children :
      [
        { path: "/", element : <Home /> },
        { path: "/profile", element : <Profile /> },
        { path: "/leave", element : <LeaveReq /> },
        { path: "/attendanceHistory", element : <AttendanceHistory /> },
      ]
      },
     

    
    ]);


  return <RouterProvider  router = {router} /> ;
}

export default App
