import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import * as ROUTES from "../../routes";
import withLayout from "../../components/hoc/withLayout";
import * as API from "../../api";

import { authSelector, signOut } from "../../redux/auth";
import { fetchingUserData, saveUserData, fetchSuccess, userLoggedOut } from "../../redux/user";
import { getCurrentUserToken } from "../../services/auth";
import Tracks from "../../components/organisms/Tracks";

function Home() {
  const { currentUser } = useSelector(authSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (async function userToken() {
      const req = await getCurrentUserToken();
      const user = await API.getUser(req);
      dispatch(saveUserData(user.data.data));
    })();
  }, []);

  function logout() {
    dispatch(signOut());
    dispatch(userLoggedOut());
  }

  async function editProfile() {
    dispatch(fetchSuccess());
    navigate(ROUTES.EDIT_PROFILE);
  }

  return (
    <main className="p-4">
      <section className="p-4">
        {currentUser && <h1 className="text-xl">Hello {currentUser.username}</h1>}
        <button type="button" onClick={logout}>
          Logout
        </button>
        <button type="button" onClick={editProfile}>
          Edit Profile
        </button>
      </section>
      <section>
        <Tracks />
      </section>
    </main>
  );
}

export default withLayout(Home);
