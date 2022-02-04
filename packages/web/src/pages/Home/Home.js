import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import * as ROUTES from "../../routes";
import withLayout from "../../components/hoc/withLayout";

import { authSelector, signOut } from "../../redux/auth";
import { fetchSuccess, userLoggedOut } from "../../redux/user";
import SearchBar from "../../components/molecules/SearchBar/SearchBar";
import PlaylistCarousel from "../../components/organisms/PlaylistCarousel/PlaylistCarousel";
import PopularTracks from "../../components/organisms/PopularTracks/PopularTracks";
import PopularGenres from "../../components/organisms/PopularGenres/PopularGenres";

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

  const TracksLayout = styled.div`
    display: flex;
    gap: 1rem;

    @media only screen and (max-width: 600px) {
      flex-direction: column-reverse;
    }
  `;

  return (
    <>
      <SearchBar />
      <PlaylistCarousel />
      <TracksLayout>
        <PopularTracks />
        <PopularGenres />
      </TracksLayout>
    </>
  );
}

export default withLayout(Home);
