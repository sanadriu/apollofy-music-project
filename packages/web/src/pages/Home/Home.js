import React from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { authSelector, signOut } from "../../redux/auth";
import * as ROUTES from "../../routes";
import * as API from "../../api";
import {
  fetchingUserData,
  saveUserData,
  fetchSuccess,
  userLoggedOut,
} from "../../redux/user/user-actions";

function Home() {
  const { isAuthenticated, currentUser } = useSelector(authSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function logout() {
    dispatch(signOut());
    dispatch(userLoggedOut());
  }

  async function editProfile() {
    const user = await API.getUser(currentUser.uid);
    dispatch(fetchingUserData());
    if (user) {
      dispatch(fetchSuccess());
      dispatch(saveUserData(user.data.data));
      navigate(ROUTES.EDIT_PROFILE);
    }
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  return (
    <main className="p-4">
      <section className="p-4">
        {isAuthenticated ? (
          <h1 className="text-xl">Hello {currentUser.username}</h1>
        ) : (
          <h1 className="text-xl">Hello World</h1>
        )}
        <button type="button" onClick={logout}>
          Logout
        </button>
        <button type="button" onClick={editProfile}>
          Edit Profile
        </button>
      </section>
    </main>
  );
}

export default Home;
