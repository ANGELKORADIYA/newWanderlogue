import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "../node_modules/react-toastify/dist/ReactToastify.css";
import "./app.css";

import { post } from "./Rest";
import Navbar from "./navbar/Navbar";
import Lander from "./login/Lander";
import Sidebar from "./gencomp/Sidebar";
import AboutUs from "./gencomp/AboutUs";
import ContactUs from "./gencomp/ContactUs"; // Fixed import typo
import Footer from "./gencomp/Footer";
import SignInPopup from "./login/SignIn";
import SignupPopup from "./login/SignUp";
import CreatePost from "./postcomp/CreatePost";
import PostList from "./postcomp/PostList";
import RandomPosts from "./postcomp/RandomPosts";

const App = () => {
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const [cookie, setCookie] = useState(document.cookie);
  const [isAuthenticated, setIsAuthenticated] = useState(!!cookie);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await post("email");
        setIsAuthenticated(response.okk);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    checkAuthentication();
  }, [cookie]);

  return (
    <Router>
      <ToastContainer />
      <Navbar
        setIsSidebarActive={setIsSidebarActive}
        isSidebarActive={isSidebarActive}
        isAuthenticated={isAuthenticated}
        changecookie={setCookie}
      />
      <Sidebar
        setIsSidebarActive={setIsSidebarActive}
        isSidebarActive={isSidebarActive}
      />
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <>
              
                <Lander type={null} changecookie={setCookie} />
              </>
            )
          }
        />
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <>
                <Lander type={"signIn"} changecookie={setCookie} />
              </>
            )
          }
        />
        <Route
          path="/signup"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <>
                <Lander type={"signUp"} changecookie={setCookie} />
              </>
            )
          }
        />
        <Route
          path="/contactus"
          element={
            <>
              <ContactUs />
            </>
          }
        />
        <Route
          path="/aboutus"
          element={
            <>
              <AboutUs />
            </>
          }
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <>
                <RandomPosts isSidebarActive={isSidebarActive} />
              </>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/createpost"
          element={
            isAuthenticated ? (
              <>
                <CreatePost />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/yourpost"
          element={
            isAuthenticated ? (
              <>
                <PostList isSidebarActive={isSidebarActive}  siteurl="my-posts" />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/yourfavorite"
          element={
            isAuthenticated ? (
              <>
                <PostList isSidebarActive={isSidebarActive} siteurl="my-favorites" />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
