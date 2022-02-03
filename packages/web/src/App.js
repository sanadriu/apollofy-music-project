import React, { useEffect } from "react";
import { Navigate, Outlet, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import PropTypes from "prop-types";

import * as ROUTES from "./routes";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login/Login";
import ResetPassword from "./pages/ResetPassword";
import EditProfile from "./pages/EditProfile";
import NotFound from "./pages/NotFound";
import Playlists from "./pages/Playlists";
import Tracks from "./pages/Tracks";
import Genres from "./pages/Genres";
import Albums from "./pages/Albums";

import { onAuthStateChanged } from "./services/auth";
import { authSelector, syncSignIn, signOut } from "./redux/auth";

import { useDarkMode } from "./hooks/useDarkMode";
import { GlobalStyles } from "./styles/GlobalStyles";
import { lightTheme, darkTheme } from "./styles/Themes";

const PrivateWrapper = ({ auth: { isAuthenticated } }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

const queryClient = new QueryClient();

function App() {
  const dispatch = useDispatch();
  const [theme, themeToggler, mountedComponent] = useDarkMode();
  const { isAuthenticated } = useSelector(authSelector);

  const themeMode = theme === "light" ? lightTheme : darkTheme;

  useEffect(() => {
    let unsubscribeFromAuth = null;

    unsubscribeFromAuth = onAuthStateChanged((user) => {
      if (user) {
        dispatch(syncSignIn());
      } else {
        dispatch(signOut());
      }
    });

    return () => {
      if (unsubscribeFromAuth) {
        unsubscribeFromAuth();
      }
    };
  }, [dispatch]);

  if (!mountedComponent) return <div />;

  return (
    <ThemeProvider theme={themeMode}>
      <QueryClientProvider client={queryClient}>
        <>
          <GlobalStyles />
          <Routes>
            <Route path="albums" element={<Albums />} />
            <Route path="playlists" element={<Playlists />} />
            <Route path="tracks" element={<Tracks />} />
            <Route path="genres" element={<Genres />} />
            <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.RESET_PASSWORD} element={<ResetPassword />} />
            {isAuthenticated && (
              <Route element={<PrivateWrapper auth={{ isAuthenticated }} />}>
                <Route path={ROUTES.HOME} exact element={<Home />} />
              </Route>
            )}
            {isAuthenticated && (
              <Route element={<PrivateWrapper auth={{ isAuthenticated }} />}>
                <Route path={ROUTES.EDIT_PROFILE} element={<EditProfile />} />
              </Route>
            )}
            {isAuthenticated && (
              <Route element={<PrivateWrapper auth={{ isAuthenticated }} />}>
                <Route path="*" element={<NotFound />} />
              </Route>
            )}
          </Routes>
        </>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

PrivateWrapper.propTypes = {
  auth: PropTypes.exact({
    isAuthenticated: PropTypes.bool,
  }),
};

PrivateWrapper.defaultProps = {
  auth: {
    isAuthenticated: false,
  },
};

export default App;
