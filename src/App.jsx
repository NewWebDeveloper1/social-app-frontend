import { Navigate, Route, Routes } from "react-router-dom";
import Authentication from "./pages/Authentication/Authentication.jsx";
import HomePage from "./pages/HomePage/HomePage";
import Message from "./pages/Message/Message";
import Login from "./pages/Authentication/Login.jsx";
import Register from "./pages/Authentication/Register.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserProfile } from "./Redux/UserProfile/user.action.jsx";
import { ThemeProvider } from "@mui/material";
import { DarkTheme } from "./theme/DarkTheme.js";

function App() {
  const userProfile = useSelector((store) => store.userProfile);

  // const auth = useSelector((store) => store.auth);

  const dispatch = useDispatch();

  const jwtToken = localStorage.getItem("jwt");

  useEffect(() => {
    if (jwtToken && !userProfile.user) {
      dispatch(getUserProfile(jwtToken));
    }
  }, [userProfile.user, dispatch, jwtToken]);

  if (jwtToken && !userProfile.user) {
    return <div>loading...</div>;
  }

  return (
    <ThemeProvider theme={DarkTheme}>
      <Routes>
        {userProfile.user ? (
          <>
            <Route path="/*" element={<HomePage />} />
            <Route path="/messages" element={<Message />} />
            {/* <Route path="*" element={<Navigate to="/" />} /> */}
          </>
        ) : (
          <>
            <Route path="/*" element={<Authentication />}>
              <Route index element={<Navigate to="signin" />} />
              <Route path="signin" element={<Login />} />
              <Route path="signup" element={<Register />} />
            </Route>
            <Route path="*" element={<Navigate to="/signin" />} />
          </>
        )}
      </Routes>
    </ThemeProvider>
  );
}

export default App;
