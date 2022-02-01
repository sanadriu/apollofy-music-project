import React from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { signOut } from "../../redux/auth/auth-actions";
import { authSelector } from "../../redux/auth/auth-selectors";
import * as ROUTES from "../../routes";
import withLayout from "../../components/hoc/withLayout";

function Home() {
  const { isAuthenticated, currentUser } = useSelector(authSelector);
  const dispatch = useDispatch();

  function logout() {
    dispatch(signOut());
  }
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  return <></>;
}

export default withLayout(Home);
