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
import ContantUs from "./gencomp/ContactUs";
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
    (async () =>
      (await post("email")) == false
        ? setIsAuthenticated(false)
        : setIsAuthenticated(!!cookie))();
  }, [cookie]);
  return (
    <Router>
      <Routes>
      <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <>
                <ToastContainer />
                <Navbar
                  setIsSidebarActive={setIsSidebarActive}
                  isSidebarActive={isSidebarActive}
                  isAuthenticated={isAuthenticated}
                />
                <Sidebar
                  setIsSidebarActive={setIsSidebarActive}
                  isSidebarActive={isSidebarActive}
                />
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
                <ToastContainer />
                <Navbar
                  setIsSidebarActive={setIsSidebarActive}
                  isSidebarActive={isSidebarActive}
                  isAuthenticated={isAuthenticated}
                />
                <Sidebar
                  setIsSidebarActive={setIsSidebarActive}
                  isSidebarActive={isSidebarActive}
                />
                <Lander type={"signIn"} changecookie={setCookie} />

                <Footer />
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
                <ToastContainer />

                <Navbar
                  setIsSidebarActive={setIsSidebarActive}
                  isSidebarActive={isSidebarActive}
                  isAuthenticated={isAuthenticated}
                />
                <Sidebar
                  setIsSidebarActive={setIsSidebarActive}
                  isSidebarActive={isSidebarActive}
                />
                <Lander type={"signUp"} changecookie={setCookie} />
              </>
            )
          }
        />
        <Route
          path="/contactus"
          element={
            <>
              <Navbar
                setIsSidebarActive={setIsSidebarActive}
                isSidebarActive={isSidebarActive}
                isAuthenticated={isAuthenticated}
              />
              <Sidebar
                setIsSidebarActive={setIsSidebarActive}
                isSidebarActive={isSidebarActive}
              />

              <ContantUs />

              <Footer />
            </>
          }
        />
        <Route
          path="/aboutus"
          element={
            <>
              <Navbar
                setIsSidebarActive={setIsSidebarActive}
                isSidebarActive={isSidebarActive}
                isAuthenticated={isAuthenticated}
              />
              <Sidebar
                setIsSidebarActive={setIsSidebarActive}
                isSidebarActive={isSidebarActive}
              />

              <AboutUs />

              <Footer />
            </>
          }
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <>
                <Navbar
                  setIsSidebarActive={setIsSidebarActive}
                  isSidebarActive={isSidebarActive}
                  isAuthenticated={isAuthenticated}
                />
                <Sidebar
                  setIsSidebarActive={setIsSidebarActive}
                  isSidebarActive={isSidebarActive}
                />

                <RandomPosts isSidebarActive={isSidebarActive} />

                <Footer />
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
                
                <Navbar isAuthenticated={isAuthenticated} />
                <Sidebar
                  setIsSidebarActive={setIsSidebarActive}
                  isSidebarActive={isSidebarActive}
                />
               
                <CreatePost />
               
                <Footer />
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
                
                <Navbar isAuthenticated={isAuthenticated} />
                <Sidebar
                  setIsSidebarActive={setIsSidebarActive}
                  isSidebarActive={isSidebarActive}
                />
                
                <PostList isSidebarActive={isSidebarActive} />

                <Footer />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        /> 
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
