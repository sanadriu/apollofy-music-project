import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import * as ROUTES from "../../routes";
import withLayout from "../../components/hoc/withLayout";

import { signOut } from "../../redux/auth";
import { userLoggedOut, userSelector } from "../../redux/user";
import SearchBar from "../../components/molecules/SearchBar/SearchBar";

function Home() {
  const { userData } = useSelector(userSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function logout() {
    dispatch(signOut());
    dispatch(userLoggedOut());
  }

  async function editProfile() {
    navigate(ROUTES.EDIT_PROFILE);
  }

  return <SearchBar />;
}

export default withLayout(Home);
