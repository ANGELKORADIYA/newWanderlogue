
export default function Login() {
    return (
        <>
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

                {/* <RandomPosts isSidebarActive={isSidebarActive} /> */}

                <Footer />
              </>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        </>
    )}