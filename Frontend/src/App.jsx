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
import Lander from "./auth/Lander";
import Sidebar from "./gencomp/Sidebar";
import AboutUs from "./gencomp/AboutUs";
import ContactUs from "./gencomp/ContactUs";
import Footer from "./gencomp/Footer";
import CreatePost from "./postcomp/CreatePost";
import PostList from "./postcomp/PostList";
import RandomPosts from "./postcomp/RandomPosts";
import CommentHolder from "./gencomment/CommentHolder";

const App = () => {
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const [cookie, setCookie] = useState(document.cookie);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const checkAuthentication = async (attempt = 1) => {
      const maxAttempts = 10;
      const timeout = 2000; // 2 seconds

      try {
        const response = await Promise.race([
          post("email"),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Timeout")), timeout)
          ),
        ]);
        setEmail(response.email);
        if (response.okk) {
          setIsAuthenticated(true);
          return;
        }
      } catch (error) {
        if (attempt < maxAttempts) {
          console.log(`Attempt ${attempt} failed. Retrying...`);
          setTimeout(() => checkAuthentication(attempt + 1), timeout);
        } else {
          console.error("All attempts failed. Setting isAuthenticated to false.");
          setIsAuthenticated(false);
        }
      }
    };

    checkAuthentication();
  }, [cookie]);

  const title = "wanderlogue";

  const AuthRoute = ({
    element = <Navigate to="/dashboard" />,
    type = "signIn",
  }) => {
    return isAuthenticated ? (
      element
    ) : (
      <Lander type={type} title={title} changecookie={setCookie} />
    );
  };

  return (
    <Router>
      <ToastContainer />
      <Navbar
        setIsSidebarActive={setIsSidebarActive}
        isSidebarActive={isSidebarActive}
        isAuthenticated={isAuthenticated}
        changecookie={setCookie}
        title={title}
      />
      <Sidebar
        setIsSidebarActive={setIsSidebarActive}
        isSidebarActive={isSidebarActive}
      />
      <Routes>
        <Route
          path="/"
          element={
            <AuthRoute element={<Navigate to="/dashboard" />} type={"signIn"} />
          }
        />
        <Route
          path="/login"
          element={
            <AuthRoute element={<Navigate to="/dashboard" />} type={"signIn"} />
          }
        />
        <Route
          path="/signup"
          element={
            <AuthRoute element={<Navigate to="/dashboard" />} type={"signUp"} />
          }
        />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route
          path="/dashboard"
          element={
            <AuthRoute
              element={<RandomPosts isSidebarActive={isSidebarActive} />}
              type={"signIn"}
            />
          }
        />
        <Route
          path="/createpost"
          element={<AuthRoute element={<CreatePost />} type={"signIn"} />}
        />
        <Route
          path="/yourpost"
          element={
            <AuthRoute
              element={
                <PostList
                  isSidebarActive={isSidebarActive}
                  siteurl="my-posts"
                />
              }
              type={"signIn"}
            />
          }
        />
        <Route
          path="/yourfavorite"
          element={
            <AuthRoute
              element={
                <PostList
                  isSidebarActive={isSidebarActive}
                  siteurl="my-favorites"
                />
              }
              type={"signIn"}
            />
          }
        />
        <Route
          path="/yourcomment"
          element={
            <AuthRoute
              element={
                <PostList
                  isSidebarActive={isSidebarActive}
                  siteurl="my-comments"
                />
              }
              type={"signIn"}
            />
          }
        />
        <Route path="/trending" element={<PostList siteurl="trending" />} />
        <Route path="/top-commented" element={<PostList siteurl="top-commented" />} />
        <Route path="/popular" element={<PostList siteurl="popular" />} />
        <Route path="*" element={<>404 not found</>} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
