import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as ROUTES from "./routes";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";

import { onAuthStateChanged } from "./services/auth";
import { syncSignIn, signOut } from "./redux/auth/auth-actions";

function App() {
  const dispatch = useDispatch();

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

  return (
    <div className="App__container">
      <h1>What ups wworld!</h1>
      <Routes>
        <Route path={ROUTES.SIGN_UP} component={SignUp} />
        <Route path={ROUTES.LOGIN} component={Login} />
        <Route path={ROUTES.RESET_PASSWORD} component={ResetPassword} />
        <Route path={ROUTES.HOME} component={Home} exact />
      </Routes>
    </div>
  );
}

export default App;
