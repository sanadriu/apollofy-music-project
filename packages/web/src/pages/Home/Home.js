import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import * as ROUTES from "../../routes";
import withLayout from "../../components/hoc/withLayout";
import * as API from "../../api";

import { signOut } from "../../redux/auth";
import { userLoggedOut, userSelector } from "../../redux/user";

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

  return (
    <main className="p-4">
      <section className="p-4">
        {userData && <h1 className="text-xl">Hello {userData.username && userData.username}</h1>}
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

export default withLayout(Home);
