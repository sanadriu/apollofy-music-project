import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import * as ROUTES from "../../routes";
import withLayout from "../../components/hoc/withLayout";

import { authSelector, signOut } from "../../redux/auth";
import { fetchSuccess, userLoggedOut } from "../../redux/user";
import SearchBar from "../../components/molecules/SearchBar/SearchBar";
import PlaylistCarousel from "../../components/organisms/PlaylistCarousel/PlaylistCarousel";
import PopularTracks from "../../components/organisms/PopularTracks/PopularTracks";

function Home() {
  const { currentUser } = useSelector(authSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function logout() {
    dispatch(signOut());
    dispatch(userLoggedOut());
  }

  async function editProfile() {
    dispatch(fetchSuccess());
    navigate(ROUTES.EDIT_PROFILE);
  }

  return (
    <>
      <SearchBar />
      <PlaylistCarousel />
      <PopularTracks />
    </>
  );
}

export default withLayout(Home);
